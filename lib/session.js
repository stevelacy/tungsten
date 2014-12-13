var jwt = require('jwt-simple');

module.exports = function(secret, opts){
  opts = opts || {};
  opts.header = opts.header || 'x-access-token';

  return function(req, res, next) {

    var token = null;

    if (req.query.token) {
      token = req.query.token;
    }
    if (req.headers[opts.header]) {
      token = req.headers[opts.header];
    }
    if (token === null) {
      return next();
    }

    try {
      var decoded = jwt.decode(token, secret);
      if (decoded === null || decoded === undefined) {
        return next();
      }
      req.auth = decoded;
      next();
    }
    catch (e){
      return next();
    }

  };
};
