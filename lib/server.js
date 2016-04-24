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
  var apicache = require('apicache').options({ debug: true }).middleware

  // CORS headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.get('/tweets/:q/:geocode', apicache('2 hours'), function(req, res) {
    recursive({
      q: req.params.q,
      geocode: req.params.geocode
    }, function(err, results, response) {
      if(err) {
        console.error('Response Status: %s', response.statusCode)
        console.error(err)
        return res.status(response.statusCode).json(err)
      }

      res.json(results.statuses)
      console.log('Total number of tweets: %s', results.statuses.length)
    })
  })

  app.get('/embed/:id', function(req, res) {
    embed({
      id: req.params.id
    }, function(err, results, response) {
      if(err) {
        console.error('Response Status: %s', response.statusCode)
        console.error(err)
        return res.status(response.statusCode).json(err)
      }
      res.json(results)
    })
  })

  var address = url.format(_.defaults({
    protocol: 'http',
  }, config.get('server')))

  app.listen(config.get('server.port'), config.get('server.hostname'), function () {
    console.log('Server available at %s', address)
    // Open server in browser
    if(config.get('open')) require('open')(address)
  })

}