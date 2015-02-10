'use strict';

var fission = require('fission');
var User = require('../../models/User');
var UserView = require('./User');

var div = fission.React.DOM.div;

module.exports = fission.collectionView({
  model: User,
  itemView: UserView,
  render: function() {
    return div({
      className: 'page'
    }, this.items);
  }
});
