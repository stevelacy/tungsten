/* globals document, window*/
'use strict';

var fission = require('fission');
var IndexView = require('./pages/Index');
var LoginView = require('./pages/Login');
var UsersView = require('./pages/Users');

var logout = fission.view({
  statics: {
    willTransitionTo: function(tr) {
      window.localStorage.removeItem('token');
      return tr.redirect('login');
    }
  },
  render: function() {
    return null;
  }
});

var Router = fission.router({
  index: {
    view: IndexView,
    path: '/'
  },
  login: {
    view: LoginView,
    path: 'login'
  },
  users: {
    view: UsersView,
    path: 'users'
  },
  logout: {
    view: logout,
    path: 'logout'
  }
});

Router.start(document.body);
