'use strict';

var should = require('should');
var tungsten = require('../');

describe('tungsten', function() {

  it('should return three functions', function(done) {
    tungsten.session.should.be.type('function');
    tungsten.encode.should.be.type('function');
    tungsten.decode.should.be.type('function');
    done();
  });
  require('./encode');
  require('./decode');
  require('./session');

});

