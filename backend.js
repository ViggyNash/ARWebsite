// Import requirements
var JSON = require('JSON')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongo = require('mongodb').MongoClient
var assert = require('assert') 
var fs = require('fs')

// Mongo server location
var url = 'mongodb://localhost:27017/articles'
var db = null

// Connect to mongo server and start app
mongo.connect(url, function(err, database) {
	assert.equal(null, err)
	console.log("Successfully connected to mongo server")

	db = database

	app.listen(9090, function() {
		console.log('App started, listening on port 9090')
	})
})

// Create Express object, enable CORS
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Route definitions
	// Communication test route
app.post('/backend_test', function(req, res){
	res.json(req.body)
	console.log(req.body)

})

	// Article data route
app.get('/articles/:article', function(req, res){
	console.log('Article request made for '+req.params.article)
	fs.readFile("articles/"+req.params.article, function(err, data) {
		if (err != null){
			console.log("Error, unable to load "+req.params.article+":\n"+err)
		}
		if(data != null) {
			var articles = db.collection('articles')
			articles.find({'name':req.params.article}).limit(1).toArray(function(err, docs) {
				assert.equal(null, err)
				console.log("sending response")
				docs[0].content = data.toString()
				res.send(docs)
			})
		}
		else console.log('ERROR:\tArticle not found')
	})
})