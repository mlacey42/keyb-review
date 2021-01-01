const express = require('express');
const router = express.Router();
const Keyboard = require('../models/keyboard');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn')
const checkKeyboardOwner = require('../utils/checkKeyboardOwner');

// Index
router.get("/", async (req, res) => {
	try {
		const keyboards = await Keyboard.find().exec();
		res.render("keyboards", {keyboards});
	}
	catch (err) {
		console.log(err);
		res.send("Error with index");
	} 
});

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const newKeyboard = {
		brand: req.body.brand,
		name: req.body.name,
		switches: req.body.switches,
		size: req.body.size,
		keycapMaterial: req.body.keycapMaterial,
		keycapType: req.body.keycapType,
		backlighting: req.body.backlighting,
		caseMaterial: req.body.caseMaterial,
		description: req.body.description,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}

	try {
		const keyboard = await Keyboard.create(newKeyboard);
		console.log(keyboard);
		req.flash("success", "Keyboard created!");
		res.redirect("/keyboards/" + keyboard._id);
	}
	catch (err) {
		console.log(err);
		req.flash("error", "Error creating keyboard");
		res.redirect('/keyboards');
	}
});

// New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("keyboards_new");
});

// Search
router.get("/search", async (req, res) => {
	try {
		const keyboards = await Keyboard.find({
			$text : {
				$search: req.query.term
			}
		});
		res.render("keyboards", {keyboards});
	}
	catch (err) {
		console.log(err);
		res.send("Error with SEARCH")
	}
});

// Show
router.get("/:id", async (req, res) => {
	try {
		const keyboard = await Keyboard.findById(req.params.id).exec();
		const comments = await Comment.find({keyboardId: req.params.id});
		res.render("keyboards_show", {keyboard, comments});
	}
	catch (err) {
		console.log(err);
		res.send("Error with /:id GET")
	}
});

// Edit
router.get("/:id/edit", isLoggedIn, checkKeyboardOwner, async (req, res) => {
	const keyboard = await Keyboard.findById(req.params.id).exec();
	res.render("keyboards_edit", {keyboard});
});

//Update
router.put("/:id", isLoggedIn, checkKeyboardOwner, async (req, res) => {
	const keyboardBody = {
		brand: req.body.brand,
		name: req.body.name,
		switches: req.body.switches,
		size: req.body.size,
		keycapMaterial: req.body.keycapMaterial,
		keycapType: req.body.keycapType,
		backlighting: req.body.backlighting,
		caseMaterial: req.body.caseMaterial,
		description: req.body.description,
		image: req.body.image
	};

	try {
		const keyboard = await Keyboard.findByIdAndUpdate(req.params.id, keyboardBody, {new: true}).exec();
		console.log(keyboard);
		req.flash("success", "Keyboard updated!");
		res.redirect(`/keyboards/${req.params.id}`);
	}
	catch (err) {
		console.log(err);
		req.flash("error", "Error updating keyboard");
		res.redirect("/keyboards");
	}
});

//Delete
router.delete("/:id", isLoggedIn, checkKeyboardOwner, async (req, res) => {
	try {
		const keyboard = await Keyboard.findByIdAndDelete(req.params.id).exec();
		console.log(keyboard);
		req.flash("success", "Keyboard deleted!");
		res.redirect("/keyboards");
	}
	catch (err) {
		console.log(err);
		req.flash("error", "Error deleting keyboard");
		res.redirect("/keyboards");
	}
});

module.exports = router;