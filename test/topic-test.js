var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../server');
var exceptions = require('../exceptions');

var topicTitle = "A discussion ssaabout abortion";
var topic = {
    "title": topicTitle
}

describe('Tests the Topic api controller', function() {
    it('POST for /api/topics', function(done) {
        request(server)
            .post('/api/topics')
            .type('form')
            .send(topic)
            .end(function(err, res) {
                console.log(err);
                console.log(res.body);
                if (!err) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.message, 'Successfully added a topic');
                    done();
                } else {
                    assert.equal(res.status, exceptions.default.status);
                    assert.equal(res.body, exceptions.default.error);
                    done(err);
                }
            });
    });

    it('DELETE for /api/topics/' + topicTitle, function(done) {
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
    });
});
