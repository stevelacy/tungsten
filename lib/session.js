'use strict';

var decode = require('./decode');

module.exports = function(secret, opts) {
  opts = opts || {};
  opts.header = opts.header || 'x-access-token';

  if (secret == null) {
    return new Error('secret must be defined');
  }

  return function(req, res, next) {

    var token = null;
    req.isAuthenticated = function() {
      return false;
    };

    if (req.query.token) {
      token = req.query.token;
    }
    if (req.headers[opts.header]) {
      token = req.headers[opts.header];
    }
    if (token === null || token == 'null') {
      return next();
    }

    try {
      var decoded = decode(token, secret);
      if (decoded === null || decoded === undefined) {
        return next();
      }
      req.isAuthenticated = function() {
        return true;
      };
      req.auth = decoded;
      next();
    }
    catch (e) {
      return next();
    }

  };
};
