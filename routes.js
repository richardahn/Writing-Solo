var express = require('express');

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
    var genRouter = express.Router();
    genRouter.get('/', function(req, res) {
        res.json({ message: 'dummytext'});
    });
    app.use(genRouter);
};
