var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var server = require('../server');
var successful = require('../strings/successful');
var unsuccessful = require('../strings/unsuccessful');

var accountOne = {
    username: "pol",
    password: "pol"
};
var accountTwo = {
    username: "lop",
    password: "lop"
};
var accountBad = {
    username: "ball",
    password: "ball"
};
var accounts = [accountOne, accountTwo];

var postUserGood = function(account) {
    return function(done) {
        request(server)
            .post('/api/users')
            .type('form')
            .send(account)
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, successful.user.post);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var postUserBad = function(account) {
    return function(done) {
        request(server)
            .post('/api/users')
            .type('form')
            .send(account)
            .expect(unsuccessful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, unsuccessful.user.post)
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var getUsersGood = function() {
    return function(done) {
        request(server)
            .get('/api/users')
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    for (var i = 0; i < res.body.length; i++) {
                        assert.equal(res.body[i].username, accounts[i].username);
                        console.log(res.body[i].verifyPassword(accounts[i].username));
                        assert.isOk(res.body[i].verifyPassword(accounts[i].username));
                    }
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var getUserGood = function(account) {
    return function(done) {
        request(server)
            .get('/api/users/' + account.username)
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body.username, account.username);
                    assert.equal(res.body.password, account.password);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var getUserBad = function(account) {
    return function(done) {
        request(server)
            .get('/api/users/' + account.username)
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, null);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var deleteUserGood = function(account) {
    return function(done) {
        request(server)
            .get('/api/users/' + account.username)
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, successful.user.delete.found);
                    done();
                } else {
                    done(err);
                }
            });
    };
};
var deleteUserBad = function(account) {
    return function(done) {
        request(server)
            .get('/api/users/' + account.username)
            .expect(successful.user.status)
            .end(function(err, res) {
                if (!err) {
                    assert.equal(res.body, successful.user.delete.notFound);
                    done();
                } else {
                    done(err);
                }
            });
    };
};


// post

describe('Tests the User api controller', function() {
    it('POST 1 for /api/users', postUserGood(accountOne));
    it('POST 2 for /api/users', postUserGood(accountTwo));
    it('Duplicate POST 1 for /api/users', postUserBad(accountOne));
    it('GET all for /api/users', getUsersGood());
    it('GET for /api/users/' + accountOne.username, getUserGood(accountOne));
    it('GET a non-existant topic for /api/users/' + accountBad.username, getUserBad(accountBad));
    it('DELETE for /api/users/' + accountOne.username, deleteUserGood(accountOne));
    it('DELETE for /api/users/' + accountTwo.username, deleteUserGood(accountTwo));
    it('DELETE a non-existant topic for /api/users/' + accountBad.username, deleteUserBad(accountBad));
});
// post
// duplicate post
// get all
// get
// get bad
// delete
// delete
// delete bad
