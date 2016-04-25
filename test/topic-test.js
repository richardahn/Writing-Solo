var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../server');
var unsuccessful = require('../strings/unsuccessful');
var successful = require('../strings/successful');

var topicOne = { title: "A discussion about labor laws" };
var topicTwo = { title: "Politics" };
var topicBad = { title: "Doesn't exist" };

var topics = [topicOne, topicTwo];

/*
Straight from the docks:
Remember that err is not an error in the sense that, for example, your post had an invalid response.
Instead, it is only an error if any of your chained expects have failed.
For example, if you expected a status code of 404, and you do get a 404, you will not get an err since that was expected
*/

var postTopicGood = function(topic) {
    return function(done) {
        request(server)
            .post('/api/topics')
            .type('form')
            .send(topic)
            .expect(successful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, successful.topic.post);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var postTopicDuplicate = function(topic) {
    return function(done) {
        request(server)
            .post('/api/topics')
            .type('form')
            .send(topic)
            .expect(unsuccessful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, unsuccessful.topic.post);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var getTopicsGood = function() {
    return function(done) {
        request(server)
            .get('/api/topics')
            .expect(successful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    for (var i = 0; i < res.body.length; i++) {
                        assert.equal(res.body[i].title, topics[i].title);
                    }
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var getTopicGood = function(topic) {
    return function(done) {
        request(server)
            .get('/api/topics/' + topic.title)
            .expect(successful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body.title, topic.title);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
/*
I noted in topicApiController that getting a topic that does not exist
will not give a bad status code. This is intentional and you should simply
receive a null body
*/
var getTopicNotexist = function(topic) {
    return function(done) {
        request(server)
            .get('/api/topics/' + topic.title)
            .expect(successful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, null);
                    done();
                } else {
                    done(err);
                }
            })
    }
}
var deleteTopicGood = function(topic) {
    return function(done) {
        request(server)
            .delete('/api/topics/' + topic.title)
            .expect(successful.topic.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, successful.topic.delete);
                    done();
                } else {
                    done(err);
                }
            });
    };
};


describe('Tests the Topic api controller', function() {
    it('POST 1 for /api/topics', postTopicGood(topicOne));
    it('POST 2 for /api/topics', postTopicGood(topicTwo));
    it('Duplicate POST 1 for /api/topics', postTopicDuplicate(topicOne));
    it('GET for /api/topics', getTopicsGood());
    it('GET for /api/topics/' + topicOne.title, getTopicGood(topicOne));
    it('GET for non-existant topic at /api/topics/' + topicBad.title, getTopicNotexist(topicBad));
    it('DELETE for /api/topics/' + topicOne.title, deleteTopicGood(topicTwo));
    it('DELETE for /api/topics/' + topicTwo.title, deleteTopicGood(topicOne));
});
