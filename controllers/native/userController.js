var User = require('../../models/user');

exports.postUser = function(username, password, cb) {
    var user = new User({
        "username": username,
        "password": password
    });

    user.save(cb);
};

exports.getUsers = function(cb) {
    User.find(cb);
};

exports.getUser = function(username, cb) {
    User.findOne({ "username": username }, cb);
}

exports.deleteUser = function(username, cb) {
    User.findOneAndRemove({ "username": username }, cb);
}
