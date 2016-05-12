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

// When am I saving? I always save when I post a user, or when I update a user, so therefore, I'll add hooks to those so that the password
// always gets saved
UserSchema.pre('save', function(cb) {
    var user = this;

    // If the password has changed, hash it
    if (!user.isModified('password')) return cb();
    // hash(data, salt, progress, callback)
    // progress isn't necessary, so null
    // salt will be auto-gen since we passed null
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) {
            return cb(err);
        } else {
            user.password = hash;
            return cb();
        }
    });
});

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compare(password, this.password);

}

module.exports = mongoose.model('User', UserSchema);
