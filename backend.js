// Import requirements
var JSON = require('JSON')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongo = require('mongodb').MongoClient
var assert = require('assert')

// Mongo server location
var url = 'mongodb://localhost:27017/myproject'

// Connect to mongo server and start app
mongo.connect(url, function(err, db) {
	assert.equal(null, err)
	console.log("Successfully connected to mongo server")

	// Create Express object, enable CORS
	var app = express()
	app.use(bodyParser.text())
	app.use(cors())

	// Route definitions
	app.get('/backend-test', function(req, res){
		res.send(req.param('data'))
		console.log(req.param('data'))
	})

	app.listen(9090, function() {
		console.log('App started, listening on port 9090')
	})
	db.close()
})

