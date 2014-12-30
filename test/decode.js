'use strict';

var request = require('supertest');
var express = require('express');
var should = require('should');
var tungsten = require('../');
var date = new Date();
var secret = 'supercat';

var tokenFixture = tungsten.encode({iss: 1234}, secret);

describe('#decode', function() {

  describe('error checks', function(){

    it('should throw an error if token is not set', function(done){
      (function() {
        tungsten.decode()();
      }).should.throw('decode token is required');
      done();
    });

    it('should throw an error if secret is not set', function(done){
      (function() {
        tungsten.decode('sup')();
      }).should.throw('decode secret is required');
      done();
    });

    it('should return an error if token is invalid', function(done){
      (function() {
        tungsten.decode('sup', 'doge')();
      }).should.throw('decode token invalid');
      done();
    });

  });

  describe('token sync', function(){

    it('should return the correct token', function(done) {
      var token = tungsten.decode(tokenFixture, secret);
      should(token).be.type('object');
      should(token.iss).equal(1234);
      done();
    });

  });

  describe('token async', function(){

    it('should return the correct token', function(done) {
      tungsten.decode(tokenFixture, secret, function(err, token) {
        should(token).be.type('object');
        should(token.iss).equal(1234);
        done();
      });
    });

  });

});
