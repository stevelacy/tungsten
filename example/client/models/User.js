'use strict';

var fission = require('fission');
var sync = require('./sync');

module.exports = fission.model({
  props: {
    _id: 'string',
    username: 'string'
  },
  url: '/v1/users',
  sync: sync
});
