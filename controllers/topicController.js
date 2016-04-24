var Topic = require('./models/topic');


// The cb will be called after topic is saved
exports.postTopic = function(name, cb) {
    var topic = new Topic();
    topic.name = name;
    topic.date = new Date();
    // topic.discussions should be empty
    topic.save(cb);
};
