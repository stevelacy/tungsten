/* globals window*/
'use strict';

var Fission = require('fission');
var Sync = require('ampersand-sync');

window._token = window.localStorage.getItem('token');

var tokenSync = function(method, model, options) {
  if (window._token != null) {
    options.headers = {
      'x-access-token': window._token
    };
  }
  return Sync(method, model, options);
};

var fission = new Fission({
  sync: tokenSync
});

fission.config = {
  url: 'http://localhost:3000'
};

module.exports = fission;
