'use strict';

// Node modules
var _ = require('lodash')
var config = require('config')
var Twitter = require('twitter')
var tw = new Twitter(config.twitter)

// Begin module
module.exports = function(options, callback) {

  tw.get('statuses/oembed', _.defaults(options, {
    // result_type: 'recent',
    // count: 3
  }), callback)

}