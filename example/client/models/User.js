'use strict';

var fission = require('fission');

module.exports = fission.model({
  props: {
    _id: 'string',
    username: 'string'
  },
  url: '/v1/users'
});
