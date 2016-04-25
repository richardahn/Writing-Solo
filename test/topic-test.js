var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../server');
var exceptions = require('../strings/exceptions');

var topicTitleOne = "A discussion ssaabout abortion";
var topicTitleTwo = "Politics";

var postTestGood = function(topicTitle) {
    return function(done) {
        var topic = {
            "title": topicTitle
        }
        request(server)
            .post('/api/topics')
            .type('form')
            .send(topic)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.message, 'Successfully added a topic');
                    done();
                } else {
                    done();
                }
            });
    }
}
var postTestDuplicate = function(topicTitle) {
    return function(done) {
        var topic = {
            "title": topicTitle
        }

        request(server)
            .post('/api/topics')
            .type('form')
            .send(topic)
            .end(function(err, res) {
                if (err) {
                    assert.equal(res.status, exceptions.default.status);
                    assert.equal(res.body, exceptions.default.error);
                    done();
                } else {
                    done();
                }

            });
    };
};
var deleteTestGood = function(topicTitle) {
    return function(done) {
        request(server)
            .delete('/api/topics/' + topicTitle)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.message, 'Topic removed.');
                    done();
                } else {
                    assert.equal(res.status, exceptions.default.status);
                    assert.equal(res.body, exceptions.default.error);
                    done(err);
                }
            });
    };
};


describe('Tests the Topic api controller', function() {
    it('POST 1 for /api/topics', postTestGood(topicTitleOne));
    it('POST 2 for /api/topics', postTestGood(topicTitleTwo));
    it('Duplicate POST for /api/topics', postTestDuplicate(topicTitleOne));
    it('DELETE for /api/topics/' + topicTitleOne, deleteTestGood(topicTitleOne));
    it('DELETE for /api/topics/' + topicTitleTwo, deleteTestGood(topicTitleTwo));
});
