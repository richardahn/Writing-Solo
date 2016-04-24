var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var userController = require('./userController');

module.exports = function(passport) {
    // We need to serialize the user into and out of session,
    // To do so, we will use their usernames to do so,
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(function(username, done) {
        User.findOne({ "username": username }, function(err, user) {
            done(err, user);
        });
    });

    // Let's set up authentication for signing up and logging in
    passport.use('local-signup', new LocalStrategy(
        {
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({ "username": username }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    // If a user was found, flash an error saying that it's taken
                    if (user) {
                        return done(null, false);
                    } else {
                        // Create a new user
                        userController.postUser(username, password, function(err, user) {
                            console.log("GOT USER!!!!");
                            console.log(user);

                            if (err) {
                                return done(err);
                            } else {
                                return done(null, user);
                            }
                        }); // end of userController.postUser
                    } // end of if/else
                }); // end of User.findOne
            }); // end of process
        } // end of function
    )); // end of passport
}
