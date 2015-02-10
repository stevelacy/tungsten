/* globals window*/
'use strict';

var fission = require('fission');

var DOM = fission.DOM;

var loginLink = DOM.a({
  href: '/login'
}, 'LOGIN');

var userLink = DOM.div(null,
  DOM.br(),
  DOM.a({
    href: '/users'
  }, 'View collection')
);

module.exports = fission.view({
  render: function() {
    return DOM.div({
      className: 'page index'
    },
      DOM.h1(null, 'INDEX'),
      window.localStorage.getItem('token') != null ? 'User Token: ' + (window.localStorage.getItem('token')) : void 0,
      window.localStorage.getItem('token') == null ? loginLink : userLink
    );
  }
});
