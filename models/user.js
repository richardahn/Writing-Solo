var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    discussions: []
});

// Create a hook function that gets called before being save()'d
UserSchema.pre('save', function(cb) {
    var user = this;

    // If the password hasn't changed and isn't new
    if (!user.isModified('password') && !user.isNew('password')) return cb();

    // If it has changed,
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return cb(err);
        } else {
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        }
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    // compare() compares a new password with the hashed password
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);
