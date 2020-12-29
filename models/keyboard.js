const mongoose = require('mongoose');

const keyboardSchema = new mongoose.Schema({
	brand: String,
	name: String,
	switches: String,
	size: String,
	keycapMaterial: String,
	keycapType: String,
	backlighting: String,
	caseMaterial: String,
	description: String,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

keyboardSchema.index({
	'$**': 'text'
})

const Keyboard = mongoose.model("keyboard", keyboardSchema);

module.exports = Keyboard;