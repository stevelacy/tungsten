'use strict';

var fission = require('../../app');
var User = require('../../models/User');
var UserView = require('./User');

var div = fission.React.DOM.div;

module.exports = function() {
  return fission.collectionView({
    model: User,
    itemView: UserView,
    render: function() {
      return div({
        className: 'page'
      }, this.items);
    }
  });
};
