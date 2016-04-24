var express = require('express');
var topicApiController = require('./controllers/api/topicApiController');

// Called when setup-routes is called
module.exports = function(app) {
    // TODO: fill up these routes later
    // ==================== Load API routes ====================== //
    var apiRouter = express.Router();
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'dummytext'});
    });
    app.use('/api', apiRouter);

    // ==================== Load General routes ================== //
    // Topic routes
    var topicRouter = express.Router();
    topicRouter.route('/topics')
        .post(topicApiController.postTopic);
    app.use(topicRouter);

    //

};
