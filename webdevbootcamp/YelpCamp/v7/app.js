var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	Campground		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	seedDB			= require("./seeds"),
	User			= require("./models/user");

//requiring routes
var commentsRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", 
				 {useUnifiedTopology: true, 
				  useNewUrlParser: true, 
				  useCreateIndex: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

seedDB();

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
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
    
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});