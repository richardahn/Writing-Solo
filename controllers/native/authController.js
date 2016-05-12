
var passport = require('passport');

exports.authenticateSignup = function(req, res, next) {
    // function(err, user, info) is the done callback
    passport.authenticate('local-signup', function(err, user, info) {
        console.log(info);
        if (err) { return next(err); }
        // If the user already exists, user will be false
        if (!user) {
            // First set the flash message to pass it to '/'
            // Now, '/' will have access to it
            req.flash('signupMsg', info.message);
            return res.redirect('/');
        } else {
            req.flash('signupMsg', info.message);
            return res.redirect('/');
        }
    })(req, res, next);
};
