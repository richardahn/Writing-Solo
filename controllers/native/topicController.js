var Topic = require('../../models/topic');

// The cb will be called after topic is saved
exports.postTopic = function(title, cb) {
    var topic = new Topic();
    topic.title = title;
    topic.date = new Date();
    // topic.discussions should be empty
    topic.save(cb);
};

exports.getTopics = function(cb) {
    Topic.find(cb);
};

exports.getTopic = function(title, cb) {
    Topic.findOne({ "title": title }, cb);
};

exports.deleteTopic = function(title, cb) {
    Topic.findOneAndRemove({ "title": title }, cb);
};
