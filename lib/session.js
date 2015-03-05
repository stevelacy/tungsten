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

    decode(token, secret, function(err, decoded) {
      if (err) {
        return next();
      }
      if (decoded === null || decoded === undefined) {
        return next();
      }

      var date = new Date();

      if (opts.exp && decoded.exp < date) {
        return next();
      }

      req.isAuthenticated = function() {
        return true;
      };
      req.auth = decoded;
      next();
    });

  };
};
