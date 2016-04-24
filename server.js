// Remember that express is a web application framework
// So it's the skeleton for your web application
// First, we need to LOAD the express framework
// and then initialize it as an application
var express = require('express'); // Web app framework
var app = express(); // The application that our server uses
var config = require('./config'); // Holds our settings for various things
var mongoose = require('mongoose'); // simple MongoDB object modeling
var bodyParser = require('body-parser');
mongoose.connect(config.mongodb.writing_solo);
var Topic = require('./models/topic');
// process.env.port is what the computer has set for its
// environment variable called PORT. It's like the default
// port that may be different for each computer.
var port = process.env.port || config.port;

// We now add our bodyParser middleware to the app
app.use(bodyParser.urlencoded({
    extended: true
}));

// Now, we can load our routes
var routes = require('./routes');
routes.setup(app);
var server = app.listen(port);
console.log('Listening on port ' + port);
module.exports = server;
