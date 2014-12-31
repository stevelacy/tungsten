'use strict';

var fission = require('../../app');
var User = require('../../models/User');
var _ref = fission.React.DOM;
var div = _ref.div;
var br = _ref.br;

var View = fission.modelView({
  model: User,
  render: function() {
    return div({
      className: 'item'
    }, 'User: ', this.model.username, br(null), 'id: ', this.model._id);
  }
});

module.exports = View;
