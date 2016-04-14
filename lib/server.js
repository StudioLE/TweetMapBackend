'use strict'

// Core moduels
var url = require('url')

// Node modules
var config = require('config')
var express = require('express')
var _ = require('lodash')

// App modules
var server = require('./server')
var search = require('./search')
var recursive = require('./recursive')
var place = require('./place')
var rate = require('./rate')
var embed = require('./embed')

// Begin module
module.exports = function(options, callback) {

  // Express modules
  var app = express()

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.get('/tweets/:q/:geocode', function(req, res) {

    recursive({
      // q: 'place:457b4814b4240d87 museum',
      q: req.params.q,
      geocode: req.params.geocode,
      // max_id: '719193546360754200'
    }, function(err, results, response) {
      if(err) throw err

      res.json(results.statuses)

      // console.log(results.statuses)
      // console.log('Length of results: %s', results.statuses.length)
      console.log('Total number of tweets: %s', results.statuses.length)
    })

  })

  app.get('/embed/:id', function(req, res) {

    embed({
      id: req.params.id
    }, function(err, results, response) {
      if(err) throw err
      res.json(results)
      // console.log(results)
    })

  })

  // app.listen(process.env.PORT || 4730)

  var address = url.format(_.defaults({
    protocol: 'http',
  }, config.get('server')))

  app.listen(config.get('server.port'), config.get('server.hostname'), function () {
    console.log('Server available at %s', address)
    // Open server in browser
    if(config.get('open')) require('open')(address)
  })

}