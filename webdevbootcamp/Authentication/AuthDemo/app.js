var express 				= require("express"),
	app 					= express(),
	mongoose 				= require("mongoose"),
	passport				= require("passport"),
	bodyParser				= require("body-parser"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose	= require("passport-local-mongoose"),
	User					= require("./models/user");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", 
				 {useUnifiedTopology: true, 
				  useNewUrlParser: true, 
				  useCreateIndex: true });

app.use(require("express-session")({
	secret: "There is no secret here, but you thought that have a secret",
	resave: false,
	saveUninitialized : false
}));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==== Routes =========
app.get("/", isLoggedIn ,function(req,res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});
  
// Auth routes
app.get("/register", function(req, res){
	res.render("register")
});

app.post("/register", function(req, res){
	
	User.register(new User({username: req.body.username}), req.body.password , function(err, user){
		
		if(err){
			console.log(err);
			return res.render("register");
		}
		
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

//Login routes
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login"
		}), function(req, res){
	
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next(); //The mean is that it can move to next in code in this file is /secret route content
	}
	res.redirect("/login");
}

app.listen(3000, function(){
	console.log("Server listen");
});