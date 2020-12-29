const Keyboard = require('../models/keyboard')

const checkKeyboardOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
		const keyboard = await Keyboard.findById(req.params.id).exec();
		if(keyboard.owner.id.equals(req.user._id)) {
			next();
		}
		else {
			res.redirect('back');
		}
	}
	else {
		res.redirect('/login');
	}
}

module.exports = checkKeyboardOwner;