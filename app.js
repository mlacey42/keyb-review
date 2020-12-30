// ===================================
// IMPORTS
// ===================================
// NPM Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Import
try {
	var config = require('./config');
}
catch (err) {
	console.log("Could not import config. Not working locally.");
	console.log(err);
}

// Route Imports
const keyboardRoutes = require('./routes/keyboards');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

// Model Imports
const Keyboard = require('./models/keyboard');
const Comment = require('./models/comment');
const User = require('./models/user');

// ===================================
// DEVELOPMENT
// ===================================
// Morgan
app.use(morgan('tiny'));

// Seed the DB
// const seed = require('./utils/seed');
// seed();


// ===================================
// CONFIG
// ===================================
// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Connect to DB
try {
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}
catch (err) {
	console.log("Could not connect using config.");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

// Method Override Config
app.use(methodOverride('_method'));

// Conncect Flash
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());							// Allows persistent sessions
passport.serializeUser(User.serializeUser());			// Tells us what data should be stored in the session
passport.deserializeUser(User.deserializeUser());		// Gets the user data from the stored session
passport.use(new LocalStrategy(User.authenticate()));	// Uses the local strategy

// State Config
// Allows access to the user on every single route
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/keyboards", keyboardRoutes);
app.use("/keyboards/:id/comments", commentRoutes);


// ===================================
// LISTEN
// ===================================
app.listen(process.env.PORT || 3000, () => {
	console.log("yelp_mk is running...");
});