'use strict';

// Node modules
var _ = require('lodash')
var async = require('async')
var config = require('config')
var Twitter = require('twitter')
var tw = new Twitter(config.twitter)

// Begin module
module.exports = function(options, callback) {

  // Example usage:
  // node cli recursive museum 54.972222,-1.608333,20km

  var count = 100
  var results = false
  var tweets = []

  async.whilst(
    function() { // Test condition
      return results === false || results.statuses.length === count
    },
    function(again) { // Repeat until test condition is false
      var max_id
      
      // If we have results then set the max_id for the next request
      if(results) {
        max_id = results.statuses[count - 1].id_str
      }
      else {
        max_id = false
      }

      console.log('max_id: %s', max_id)

      // Get results from twitter API
      tw.get('search/tweets', _.assign(options, {
        result_type: 'recent',
        count: count,
        // include_entities: false,
        max_id: max_id,
        // q: 'museum',
        // geocode: '54.972222,-1.608333,20km',
      }), function(err, r, response) {
        results = r
        if(err) throw err

        // Add results to global array
        tweets = tweets.concat(results.statuses)

        console.log(results)
        console.log('Length of results: %s', results.statuses.length)
        console.log('max_id: %s', max_id)
        console.log('Total number of tweets: %s', tweets.length)

        // async.whilst callback
        again(null, results)

      })

    },
    function(err, results) { // Test condition met
      
      // Display results
      console.log('Done')
      console.log(tweets)
      console.log('Total number of tweets: %s', tweets.length)
    }
  )

}