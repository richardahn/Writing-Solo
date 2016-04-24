
var topicController = require('../topicController');

exports.postTopic = function(req, res) {
    topicController.postTopic(req.body.name, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Added topic' });
        }
    });
}
