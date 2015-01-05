'use strict';

var utils = require('./utils');

module.exports = function(token, secret, cb) {
  if (!token) {
    err = 'decode token is required';
    if (cb) {
      return cb(new Error(err));
    }
    return new Error(err);
  }
  if (!secret) {
    err = 'decode secret is required';
    if (cb) {
      return cb(new Error(err));
    }
    return new Error(err);
  }

  var segArray = token.split('.');
  if (segArray.length !== 3) {
    err = 'decode token invalid';
    if (cb) {
      return cb(new Error(err));
    }
    return new Error(err);
  }

  var segments = {
    header: segArray[0],
    payload: segArray[1],
    signature: segArray[2],
  };

  var header = JSON.parse(utils.base64Decode(segArray[0]));
  var payload = JSON.parse(utils.base64Decode(segArray[1]));


  var method = utils.maps.algorithm[header.alg];
  var type = utils.maps.type[header.alg];

  if (!method || !type) {
    var err = new Error('Algorithm invalid or unsupported');
    if (cb) {
      return cb(err);
    }
    throw err;
  }

  var input = [segments.header, segments.payload].join('.');
  if (!utils.verify(input, secret, method, type, segments.signature)) {
    var ierr = new Error('Signature verification failed');
    if (cb) {
      return cb(ierr);
    }
    throw ierr;
  }

  if (cb) {
    return cb(null, payload);
  }
  return payload;

};
