var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/scraperdb');

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



module.exports = db