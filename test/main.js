'use strict';

var request = require('supertest');
var should = require('should');
var tungsten = require('../');

var date = new Date();
var secret = 'supercat';

var token = tungsten.encode({
  id: '123',
  exp: date + 345600000
}, secret);

describe('tungsten', function(){

  it('should return three functions', function(done){
    tungsten.session.should.be.type('function');
    tungsten.encode.should.be.type('function');
    tungsten.decode.should.be.type('function');
    done();
  });

});