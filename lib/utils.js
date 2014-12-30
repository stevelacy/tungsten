'use strict';

var crypto = require('crypto');

module.exports = {
  base64Encode: function(str) {
    return this.base64urlUnescape(new Buffer(str).toString('base64'));
  },
  base64Decode: function(str) {
    return new Buffer(this.base64urlUnescape(str), 'base64').toString();
  },
  base64urlEscape: function(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  },
  base64urlUnescape: function(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  },
  maps: {
    algorithm: {
      HS256: 'sha256',
      HS384: 'sha384',
      HS512: 'sha512',
      RS256: 'RSA-SHA256'
    },
    type: {
      HS256: 'hmac',
      HS384: 'hmac',
      HS512: 'hmac',
      RS256: 'sign'
    }
  },
  sign: function (input, key, method, type) {

    if(type === 'hmac') {
      return this.base64urlEscape(crypto.createHmac(method, key).update(input).digest('base64'));
    }

    if(type === 'sign') {
      return this.base64urlEscape(crypto.createSign(method).update(input).sign(key, 'base64'));
    }

    throw new Error('Algorithm type not recognized');

  },
  verify: function(input, key, method, type, signature) {
    if (type === 'hmac') {
      return (signature === this.sign(input, key, method, type));
    }

    if (type === 'sign') {
      var res = crypto
        .createVerify(method)
        .update(input)
        .verify(key, this.base64urlUnescape(signature), 'base64');
      return res;
    }

    throw new Error('Algorithm type not recognized');

  }
};
