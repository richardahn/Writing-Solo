// Mongoose is used for simple object modeling
var mongoose = require('mongoose');

// Define our topic schema
var TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    date: Date,
    discussions: []
});

module.exports = mongoose.model('Topic', TopicSchema);