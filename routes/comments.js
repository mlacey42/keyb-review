const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Keyboard = require('../models/keyboard');
const isLoggedIn = require('../utils/isLoggedIn')
const checkCommentOwner = require('../utils/checkCommentOwner');

//New Comment (Shows Form)
router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {keyboardId: req.params.id});
});

//Create Comment (Updates DB)
router.post("/", isLoggedIn, async (req,res) => {
	try {
		const comment = await Comment.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			keyboardId: req.body.keyboardId
		});
		req.flash("success", "Comment created!");
		res.redirect(`/keyboards/${req.body.keyboardId}`);
	}
	catch (err) {
		console.log(err);
		req.flash("error", "Error creating comment");
		res.redirect(`/keyboards/${req.body.keyboardId}`);
	}
});

//Edit Comment (Shows the edit form)
router.get("/:commentId/edit", isLoggedIn, checkCommentOwner, async (req, res) => {
	try {
		const keyboard = await Keyboard.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();	
		res.render("comments_edit", {keyboard, comment});
	}
	catch (err) {
		console.log(err);
		res.send("Broken... edit comments GET");
	}
});

//Update Comment (Updates the DB)
router.put("/:commentId", isLoggedIn, checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		req.flash("success", "Comment updated!");
		res.redirect(`/keyboards/${req.params.id}`);
	}
	catch (err){
		console.log(err);
		req.flash("error", "Error updating comment");
		res.redirect(`/keyboards/${req.params.id}`);
	}
});

//Delete Comment
router.delete("/:commentId", isLoggedIn, checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		req.flash("success", "Comment deleted!");
		res.redirect(`/keyboards/${req.params.id}`);
	}
	catch (err) {
		console.log(err);
		req.flash("error", "Error deleting comment");
		res.redirect('/keyboards');
	}
});

module.exports = router;