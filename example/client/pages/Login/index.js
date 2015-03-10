/* globals window, alert*/
'use strict';

var superagent = require('superagent');
var fission = require('fission');

var DOM = fission.DOM;

module.exports = fission.view({
  statics: {
    willTransitionTo: function(transition) {
      if (window.localStorage.getItem('token')) {
        return transition.redirect('/');
      }
    }
  },
  init: function() {
    return {
      username: '',
      password: ''
    };
  },
  login: function(e) {

    e.preventDefault();
    var data = {
      username: this.state.username,
      password: this.state.password
    };

    superagent.post('/login', data, (function(_this) {
      return function(err, res) {
        if ((res != null ? res.status : void 0) === 200) {
          window.user = res.body.user;
          window.localStorage.setItem('token', res.body.user.token);
          window.location = '/';
        } else {
          return alert('username/password error');
        }
      };
    })(this));
  },
  updateUsername: function(e) {
    return this.setState({
      username: e.target.value
    });
  },
  updatePassword: function(e) {
    return this.setState({
      password: e.target.value
    });
  },
  render: function() {
    return DOM.div({
      className: 'page login'
    },
      DOM.h1(null, 'Login'),
      DOM.h5(null, 'username: username, password: password'),
      DOM.input({
        type: 'text',
        name: 'username',
        value: this.state.username,
        onChange: this.updateUsername
      }),
      DOM.input({
        type: 'password',
        name: 'password',
        value: this.state.password,
        onChange: this.updatePassword
      }),
      DOM.button({
        onClick: this.login
      }, 'LOGIN'));
  }
});
