var userController = require('../native/userController');
var unsuccessful = require('../../strings/unsuccessful');
var successful = require('../../strings/successful');

// ================== POST request at endpoint /api/users ================== //
exports.postUser = function(req, res) {
    userController.postUser(req.body.username, req.body.password, function(err) {
        if (err) {
            res.status(unsuccessful.user.status);
            res.json(unsuccessful.user.post);
        } else {
            res.json(successful.user.post);
        }
    });
};

// ================== GET request at endpoint /api/users ================== //
exports.getUsers = function(req, res) {
    userController.getUsers(function(err, users) {
        if (err) {
            res.status(unsuccessful.user.status);
            res.json(unsuccessful.user.get);
        } else {
            res.json(users);
        }
    });
};

// ================== GET request at endpoint /api/users/:username ================== //
exports.getUser = function(req, res) {
    userController.getUser(req.params.username, function(err, user) {
        if (err) {
            res.status(unsuccessful.user.status);
            res.json(unsuccessful.user.get);
        } else {
            res.json(user);
        }
    });
};

// ================== DELETE request at endpoint /api/users/:username ================== //
exports.deleteUser = function(req, res) {
    userController.deleteUser(req.params.username, function(err, user) {
        if (err) {
            res.status(unsuccessful.user.status);
            res.json(unsuccessful.user.delete);
        } else {
            if (user) {
                res.json(successful.user.delete.found);
            } else {
                res.json(successful.user.delete.notFound);
            }
        }
    })
}
