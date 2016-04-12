'use strict';

// Node modules
var config = require('config')
var Twitter = require('twitter')
var tw = new Twitter(config.twitter)

// Begin module
module.exports = function(callback) {

  tw.get('application/rate_limit_status', {
    resources: 'search'
  }, callback)

}