var User = require('../../models/user');

exports.postUser = function(username, password, cb) {
    var user = new User({
        "username": username,
        "password": password
    });

    // The mongoose save callback will pass in (err, documentSaved, number of ros affected)
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
