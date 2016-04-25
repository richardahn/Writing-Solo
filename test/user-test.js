var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../server');
var unsuccessful = require('../strings/unsuccessful');

var accountOne = {
    username: "pol",
    password: "pol"
}
var accountTwo = {
    username: "lop",
    password: "lop"
}

/*
var postUserGood = function(account) {
    return function(done) {
        request(server)
            .post('/api/users')
            .type('form')
            .send(account)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.status, successful.topic.status);
                    assert.equal(res.body, successful.topic.post);
                    done();
                } else {
                    done();
                }
            });
    };
};
*/
