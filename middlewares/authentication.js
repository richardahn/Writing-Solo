var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var userController = require('../controllers/native/userController');
var passport = require('passport');

exports.setup = function() {
    // We need to serialize the user into and out of session,
    // To do so, we will use their usernames to do so,
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(function(username, done) {
        userController.getUser(username, function(err, user) {
            done(err, user);
        });
    });

    // Let's set up authentication for signing up and logging in
    passport.use('local-signup', new LocalStrategy(
        {
            passReqToCallback: true
        },
        function(req, username, password, done) {
            // Why use process.nextTick() here?
            // process.nextTick() seems to only be used for recursive functions that don't let other functions get their requests handled in the event loop
            process.nextTick(function() {
                userController.getUser(username, function(err, user) {
                    console.log(err);
                    // Err is commonly used for exceptions, not really for bugs concerning the logic of your function(such as username already exists)
                    // The whole point of the callback here is to return some indication of success/failure
                    // If you found a pre-existing user, return false
                    // If you found no user, make the account, and return the user
                    if (err) { return done(err); }
                    if (user) {
                        // If the user was found, flash an error saying that the username already exists
                        return done(null, false, { message: 'Username already exists.' });
                    } else {
                        // If the user wasn't found, flash message of success
                        userController.postUser(username, password, function(err, user) {
                            done(err, user, { message: 'Successfully made an account!' })
                        });
                        // agh, so if you call done here again, you will get a 'cannot send
                        // headers after they are sent' error, since you are already sending
                        // done to postUser
                    }
                });
            }); // end of process
        } // end of function
    )); // end of passport

    // passport.use('local-login', new LocalStrategy(
    //     {
    //         passReqToCallback: true
    //     },
    //
    // )); // end of passport
}
