'use strict';

var fission = require('fission');
var User = require('../../models/User');
var DOM = fission.DOM;
var div = DOM.div;
var br = DOM.br;

module.exports = fission.modelView({
  render: function() {
    return div({
      className: 'item'
    }, 'User: ', this.model.username, br(null), 'id: ', this.model._id);
  }
});
