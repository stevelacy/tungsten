'use strict';

var fission = require('fission');
var User = require('../../models/User');
var _ref = fission.DOM;
var div = _ref.div;
var br = _ref.br;

module.exports = fission.modelView({
  model: User,
  render: function() {
    return div({
      className: 'item'
    }, 'User: ', this.model.username, br(null), 'id: ', this.model._id);
  }
});
