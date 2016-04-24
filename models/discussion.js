var mongoose = require('mongoose');

var DiscussionSchema = new mongoose.Schema({
    title: String,
    date: Date,
    content: String
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
