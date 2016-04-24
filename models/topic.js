// Mongoose is used for simple object modeling
var mongoose = require('mongoose');

// Define our topic schema
// I'm assuming a one-to-many model as opposed to a one-to-squillions model
var TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    date: Date,
    discussions: [] // one-to-many relationship with discussions
});

module.exports = mongoose.model('Topic', TopicSchema);
