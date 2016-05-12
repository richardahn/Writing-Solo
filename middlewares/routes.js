var express = require('express');
var topicApiController = require('../controllers/api/topicApiController');
var userApiController = require('../controllers/api/userApiController');
var authController = require('../controllers/native/authController');

// Called when setup-routes is called
exports.setup = function setup(app) {
    // TODO: fill up these routes later
    // ==================== Load API routes ====================== //
    var apiRouter = express.Router();
    apiRouter.route('/topics')
        .post(topicApiController.postTopic)
        .get(topicApiController.getTopics);
    apiRouter.route('/topics/:title')
        .get(topicApiController.getTopic)
        .delete(topicApiController.deleteTopic);
    apiRouter.route('/users')
        .post(userApiController.postUser)
        .get(userApiController.getUsers);
    app.use('/api', apiRouter);

    // ==================== Load General routes ================== //
    // Topic routes
    var genRouter = express.Router();
    genRouter.route('/')
        .get(function(req, res) {
            res.render('index', { message: req.flash('signupMsg') });
        })
        .post(authController.authenticateSignup);
    app.use(genRouter);
};
