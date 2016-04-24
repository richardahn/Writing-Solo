var userController = require('../userController');

exports.postUser = function(req, res) {
    userController.postUser(req.body.username, req.body.password, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'New user added! '});
        }
    });
};

exports.getUsers = function(req, res) {
    userController.getUsers(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
};
