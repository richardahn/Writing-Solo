var express = require('express');
var topicApiController = require('./controllers/api/topicApiController');

// Called when setup-routes is called
function setup(app) {
    // TODO: fill up these routes later
    // ==================== Load API routes ====================== //
    var apiRouter = express.Router();
    apiRouter.route('/topics')
        .post(topicApiController.postTopic)
        .get(topicApiController.getTopics);
    apiRouter.route('/topics/:title')
        .get(topicApiController.getTopic)
        .delete(topicApiController.deleteTopic);
    app.use('/api', apiRouter);

    // ==================== Load General routes ================== //
    // Topic routes
    var topicRouter = express.Router();
    topicRouter.route('/topics')
        .post(topicApiController.postTopic);
    app.use(topicRouter);

};

exports.setup = setup;
