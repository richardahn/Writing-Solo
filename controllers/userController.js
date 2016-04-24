var User = require('../models/user');

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
