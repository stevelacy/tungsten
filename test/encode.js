'use strict';

var request = require('supertest');
var express = require('express');
var should = require('should');
var tungsten = require('../');
var date = new Date();
var secret = 'supercat';

var tokenFixture = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEyOTJ9.bmrdEQq7bJuOCu-RaVvJ0OO_rnD95PvXhsL_2GG5cuE';

describe('#encode', function() {

  describe('error checks sync', function(){

    it('should throw an error if payload is not set', function(done) {
      should(tungsten.encode).throw('encode payload is required');
      done();
    });

    it('should throw an error if secret is not set', function(done) {
      (function() {
        tungsten.encode({})();
      }).should.throw('encode secret is required');
      done();
    });

    it('should throw an error if algorithm is invalid or unsupported', function(done) {
      (function() {
        tungsten.encode({}, 'test', 'doge')();
      }).should.throw('Algorithm invalid or unsupported');
      done();
    });
  });

  describe('error checks async', function(){

    it('should return an error if algorithm is invalid or unsupported', function(done) {
      tungsten.encode({}, 'test', 'doge', function(err, token){
        should(String(err)).equal(String(new Error('Algorithm invalid or unsupported')));
        done();
      });
    });
  });

  describe('token sync', function() {

    it('should return the correct encoded token', function(done) {
      var token = tungsten.encode({iss: 1292}, secret);
      token.should.be.type('string');
      token.should.equal(tokenFixture);
      token.split('.').length.should.equal(3);
      done();
    });

  });

  describe('token async', function() {

    it('should return the correct encoded token', function(done) {
      tungsten.encode({iss: 1292}, secret, function(err, token) {
        should(err).equal(null);
        token.should.be.type('string');
        token.should.equal(tokenFixture);
        token.split('.').length.should.equal(3);
        done();
      });
    });

  });

});
