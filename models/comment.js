const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	keyboardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Keyboard"
	}
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;