const Keyboard = require('../models/keyboard')

const checkKeyboardOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
		const keyboard = await Keyboard.findById(req.params.id).exec();
		if(keyboard.owner.id.equals(req.user._id)) {
			next();
		}
		else {
			req.flash("error", "User is not the owner of this review.");
			res.redirect('back');
		}
	}
	else {
		req.flash("error", "Sign in to access more features.");
		res.redirect('/login');
	}
}

module.exports = checkKeyboardOwner;