var userController = require('../native/userController');
var exceptions = require('../../strings/exceptions');
var successful = require('../../strings/success');

// ================== POST request at endpoint /api/users ================== //
exports.postUser = function(req, res) {
    userController.postUser(req.body.username, req.body.password, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json(successful.user.post);
        }
    });
};

// ================== GET request at endpoint /api/users ================== //
exports.getUsers = function(req, res) {
    userController.getUsers(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
};
