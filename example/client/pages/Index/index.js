/* globals window*/
'use strict';

var fission = require('fission');

var DOM = fission.DOM;
var Link = fission.Link;


module.exports = fission.view({
  render: function() {

    var loginLink = DOM.a({
      href: '/login'
    }, 'LOGIN');

    var userLink = DOM.div(null,
      DOM.br(),
      Link({
        to: '/users'
      }, 'View collection')
    );

    var logOut = DOM.div(null,
      DOM.br(),
      Link({
        to: 'logout'
      }, 'Logout')
    );

    return DOM.div({
      className: 'page index'
    },
      DOM.h1(null, 'INDEX'),
      window.localStorage.getItem('token') != null ? 'User Token: ' + (window.localStorage.getItem('token')) : void 0,
      window.localStorage.getItem('token') == null ? loginLink : userLink,
      logOut
    );
  }
});
