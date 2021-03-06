// configure dotenv
require('dotenv').config();

var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	flash			= require("connect-flash"),
	Campground		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	seedDB			= require("./seeds"),
	User			= require("./models/user");


//requiring routes
var commentsRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");

//console.log(process.env);

var url = process.env.DATABASEURL || "mongodb://localhost:27017/y_c_final";

mongoose.connect(url, 
				 {useUnifiedTopology: true, 
				  useNewUrlParser: true, 
				  useCreateIndex: true,
				  useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require('moment');
//seedDB(); //seed the DB

//Passport configuration
app.use(require("express-session")({
	secret: "I love my secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use in any single route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
    
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});