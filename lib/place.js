'use strict';

// Node modules
var config = require('config')
var Twitter = require('twitter')
var tw = new Twitter(config.twitter)

// Begin module
module.exports = function(place, callback) {

  tw.get('geo/search', {
    query: place,
    granularity: 'city'
  }, callback)

}