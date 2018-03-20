var mongoose = require('mongoose');

var MONGDB_URI = "mongodb://heroku_5r1qb89n:k8oqahesigrfq7c4gagnhgg874@ds117489.mlab.com:17489/heroku_5r1qb89n"

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperdb'

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

var db = mongoose.connection

//error handling for when an error happens
// it will listen for error
db.on("error", function(error){
console.log("mongoose error", error)
})

//listens for when the connection is working
db.once("open", function(){
	console.log("mongoose connected")
})



module.exports = mongoose