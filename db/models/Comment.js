var mongoose = require("mongoose")
var db = require("./index")

var CommentSchema = new mongoose.Schema({
	content: {type: String, required: true},

})

var Comment = db.model("Comment", CommentSchema)

module.exports = Comment;