'use strict'

// App modules
var server = require('./lib/server')
var search = require('./lib/search')
var recursive = require('./lib/recursive')
var place = require('./lib/place')
var rate = require('./lib/rate')

// Get command line args
var arg = process.argv.slice(2)

// Search tweets recursively
if(arg[0] == 'server') {
  server(function() {

  })
}
// Search tweets
else if(arg[0] == 'search' && arg[1] && arg[2]) {

  // London
  // node cli search museum 51.507222,-0.1275,20km

  // Newcastle upon Tyne
  // node cli search museum 54.972222,-1.608333,20km

  // New York
  // node cli search museum 40.7127,-74.0059,20km

  search({
    // q: 'place:457b4814b4240d87 museum',
    q: arg[1],
    geocode: arg[2],
    // max_id: '719193546360754200'
  }, function(err, results, response) {
    if(err) throw err
    // console.log(response)
    console.log(results.statuses)
    console.log('Length of results: %s', results.statuses.length)
  })

}
// Search tweets recursively
else if(arg[0] == 'recursive' && arg[1] && arg[2]) {

  // London
  // node cli recursive museum 51.507222,-0.1275,20km

  // Newcastle upon Tyne
  // node cli recursive museum 54.972222,-1.608333,20km

  // New York
  // node cli recursive museum 40.7127,-74.0059,20km

  recursive({
    q: arg[1],
    geocode: arg[2],
  }, function(err, results, response) {
    if(err) throw err
    // console.log(response)
    // console.log(results.statuses)
    // console.log('Length of results: %s', results.statuses.length)
  })

}
// Find place id
else if(arg[0] == 'place' && arg[1]) {
  place(arg[1], function(err, results, response) {
    if(err) throw err
    // console.log(response)
    // console.log(tweets.statuses.length)
    console.log(results.result.places)
  })
}
// Request rate_limit_status
else if(arg[0] == 'rate') {
  rate(function(err, results, response) {
    if(err) throw err
    // console.log(response)
    // console.log(results)
    console.log(results.resources.search)
  })
}

// Invalid Operation
else {
  console.log('invalid operation %s', arg[0])
}
