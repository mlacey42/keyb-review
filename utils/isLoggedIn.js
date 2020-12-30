const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Sign in to acccess more features.");
		res.redirect('/login');
	}
};

module.exports = isLoggedIn;