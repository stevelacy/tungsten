/* globals window*/
'use strict';


var Sync = require('ampersand-sync');

window.token = window.localStorage.getItem('token');

var tokenSync = function(method, model, options) {
  if (window.token != null) {
    options.headers = {
      'x-access-token': window.token
    };
  }
  return Sync(method, model, options);
};
