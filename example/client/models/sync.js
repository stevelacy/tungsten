/* globals window*/
'use strict';


var Sync = require('ampersand-sync');

window.token = window.localStorage.getItem('token');

module.exports = function(method, model, options) {
  console.log(method, model, options);
  if (window.token != null) {
    options.headers = {
      'x-access-token': window.token
    };
  }
  return Sync(method, model, options);
};
