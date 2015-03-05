'use strict';

var request = require('supertest');
var express = require('express');
var should = require('should');
var tungsten = require('../');
var date = new Date();
var secret = 'supercat';

var token = tungsten.encode({
  id: '123',
  exp: date + 345600000
}, secret);

var invalidToken = tungsten.encode({
  id: '123',
  exp: date + 345600000
}, 'othercat');

var expiredToken = tungsten.encode({
  id: '123',
  exp: date - 100
}, secret);


  describe('#session', function() {
    describe('error checks', function() {

      it('should return an error if the secret is not defined', function(done) {
        String(tungsten.session()).should.equal('Error: secret must be defined');
        done();
      });

      it('should return if the token is null', function(done) {
        var req = {
          query: {},
          headers: {}
        };
        var res = {};
        var next = function() {
          done();
        };

        tungsten.session('test', {})(req, res, next);

      });

      it('should not set req.auth if token is null', function(done) {
        var app = express()
        .use(tungsten.session('test'))
        .use(function(req, res, next){
          should(req.auth).equal(undefined);
          should(next).be.type('function');
          done();
        });

        request(app)
          .get('/')
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

      it('should set req.isAuthenticated() false if token is null', function(done) {
        var app = express()
        .use(tungsten.session('test'))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(false);
          should(next).be.type('function');
          done();
        });

        request(app)
          .get('/')
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });
    });

    describe('query token', function() {

      it('should set req.isAuthenticated() false if token is invalid', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(false);
          should(req.auth).equal(undefined);
          done();
        });

        request(app)
          .get('/')
          .query({token: invalidToken})
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

      it('should set .isAuthenticated() true if token is valid', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(true);
          done();
        });

        request(app)
          .get('/')
          .query({token: token})
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

      it('should set req.auth to the correct token data', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(true);
          should(req.auth).be.type('object');
          should(req.auth.id).equal('123');
          done();
        });

        request(app)
          .get('/')
          .query({token: token})
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

    });

    describe('header token', function() {

      it('should set req.isAuthenticated() false if token is invalid', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(false);
          should(req.auth).equal(undefined);
          done();
        });

        request(app)
          .get('/')
          .set('x-access-token', invalidToken)
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

      it('should set req.isAuthenticated() true if token is valid', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(true);
          done();
        });

        request(app)
          .get('/')
          .set('x-access-token', token)
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

      it('should set req.auth to the correct token data', function(done) {
        var app = express()
        .use(tungsten.session(secret))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(true);
          should(req.auth).be.type('object');
          should(req.auth.id).equal('123');
          done();
        });

        request(app)
          .get('/')
          .set('x-access-token', token)
          .expect(200, function(err, res) {
            should(err).equal(null);
          });
      });

    });

    describe('expiration option', function() {

      it('should not allow an expired token', function(done) {
        var opts = {
          exp: true
        };
        var app = express()
        .use(tungsten.session(secret, opts))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(false);
          should(req.auth).equal(undefined);
          done();
        });

        request(app)
          .get('/')
          .query({token: expiredToken})
          .expect(200, function(err, res) {
            should(err).equal(null);
          });

      });

      it('should allow a not expired token', function(done) {
        var opts = {
          exp: true
        };
        var app = express()
        .use(tungsten.session(secret, opts))
        .use(function(req, res, next){
          should(req.isAuthenticated()).equal(true);
          should(req.auth).be.type('object');
          should(req.auth.id).equal('123');
          done();
        });

        request(app)
          .get('/')
          .query({token: token})
          .expect(200, function(err, res) {
            should(err).equal(null);
          });

      });

    });

  });
