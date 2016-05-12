// ================== Load necessary files ================== //
var express = require('express'); // Web app framework
var app = express(); // The application that our server uses
var config = require('./config'); // Holds our settings for various things
var mongoose = require('mongoose'); // simple MongoDB object modeling
var bodyParser = require('body-parser'); // middleware that parses body -> req.body
var cookieParser = require('cookie-parser'); // middleware that parses cookies
var passport = require('passport'); // for authentication
var session = require('express-session'); // for sessions
var flash = require('connect-flash');
mongoose.connect(config.mongodb.writing_solo);
var port = process.env.port || config.port;

// ================== Setup the application ================== //
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ================== Setup authentication ================== //
var authentication = require('./middlewares/authentication');
authentication.setup();

// ==================== Setup routing ==================== //
var routes = require('./middlewares/routes');
routes.setup(app);

// ================== Start the server ================== //
var server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});
module.exports = server;
