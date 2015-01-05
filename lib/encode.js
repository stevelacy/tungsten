'use strict';

var utils = require('./utils');

module.exports = function(payload, secret, algorithm, cb) {
  if (!payload) {
    err = 'encode payload is required';
    if (cb) {
      return cb(new Error(err));
    }
    return new Error(err);

  }
  if (!secret) {
    err = 'encode secret is required';
    if (cb) {
      return cb(new Error(err));
    }
    return new Error(err);
  }
  if (!cb && typeof algorithm === 'function') {
    cb = algorithm;
    algorithm = 'HS256';
  }
  if (!algorithm) {
    algorithm = 'HS256';
  }

  var method = utils.maps.algorithm[algorithm];
  var type = utils.maps.type[algorithm];

  if (!method || !type) {
    var err = new Error('Algorithm invalid or unsupported');
    if (cb) {
      return cb(err);
    }
    return err;
  }

  var header = {
    typ: 'JWT',
    alg: algorithm
  };

  var segments = [];

  segments.push(utils.base64Encode(JSON.stringify(header)));
  segments.push(utils.base64Encode(JSON.stringify(payload)));
  segments.push(utils.sign(segments.join('.'), secret, method, type));

  var token = segments.join('.');

  if (cb) {
    return cb(null, token);
  }
  return  token;

};
