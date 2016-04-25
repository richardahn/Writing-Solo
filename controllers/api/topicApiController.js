var topicController = require('../native/topicController');
var unsuccessful = require('../../strings/unsuccessful');
var successful = require('../../strings/successful');

// ================== POST request at endpoint /api/topics ================== //
exports.postTopic = function(req, res) {
    topicController.postTopic(req.body.title, function(err) {
        if (err) {
            res.status(unsuccessful.topic.status);
            res.json(unsuccessful.topic.post);
        } else {
            res.json(successful.topic.post);
        }
    });
};

// ================== GET request at endpoint /api/topics ================== //
exports.getTopics = function(req, res) {
    topicController.getTopics(function(err, topics) {
        if (err) {
            res.status(unsuccessful.topic.status);
            res.json(unsuccessful.topic.get);
        } else {
            res.json(topics);
        }
    });
};

// ================== GET request at endpoint /api/topics/:title ================== //
exports.getTopic = function(req, res) {
    topicController.getTopic(req.params.title, function(err, topic) {
        // No error will be given when nothing is found. This is intentional and api users are aware
        if (err) {
            res.status(unsuccessful.topic.status);
            res.json(unsuccessful.topic.get);
        } else {
            res.json(topic);
        }
    });
};

// ================== DELETE request at endpoint /api/topics/:title ================== //
exports.deleteTopic = function(req, res) {
    topicController.deleteTopic(req.params.title, function(err) {
        if (err) {
            res.status(unsuccessful.topic.status);
            res.json(unsuccessful.topic.delete);
        } else {
            res.json(successful.topic.delete);
        }
    });
};
