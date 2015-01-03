'use strict';

var utils = require('./utils');

module.exports = function(payload, secret, algorithm, cb) {
  if (!payload) {
    return cb(new Error('encode payload is required'));
  }
  if (!secret) {
    return cb(new Error('encode secret is required'));
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
    throw err;
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
