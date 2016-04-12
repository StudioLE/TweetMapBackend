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



// { id: '457b4814b4240d87',
//   url: 'https://api.twitter.com/1.1/geo/id/457b4814b4240d87.json',
//   place_type: 'city',
//   name: 'London',
//   full_name: 'London, England',
//   country_code: 'GB',
//   country: 'United Kingdom',
//   contained_within: [ [Object] ],
//   centroid: [ -0.14032122753075282, 51.50009175 ],
//   bounding_box: { type: 'Polygon', coordinates: [Object] },
//   attributes: {} },

}