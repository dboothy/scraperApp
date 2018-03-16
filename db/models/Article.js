var mongoose = require("mongoose")
var db = require("./index")
var Comment = require("./Comment")


var ArticleeSchema = new mongoose.Schema({
	
	headline: {type: String, required: true},
	summary: {type: String, required: true},
	url: {type: String, required: true},
	comments: [Comment.Schema]
})

var Article = db.model("Article", CommentSchema)

module.exports = Comment;

