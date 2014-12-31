'use strict';

var fission = require('../app');

module.exports = fission.model({
  props: {
    _id: 'string',
    username: 'string'
  },
  url: fission.config.url + '/v1/users'
});
