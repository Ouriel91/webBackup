var express 	= require("express");
var router		= express.Router();
var passport	= require("passport");
var User		= require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// ==============================================================
// Auth Routes
// ==============================================================

//show register form
router.get("/register", function(req, res){
	res.render("register", {page: "register"});
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		
		if(err){
			console.log(err);
			return res.render("register", {"error":err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Nice to meet you " + req.body.username);
			res.redirect("/campgrounds")
		});
	});
});

//show login form 
router.get("/login", function(req,res){

	res.render("login", {page: "login"});
});

//handle login logic
router.post("/login",passport.authenticate("local", 
	{
	successRedirect: "/campgrounds" , 
	failureRedirect:"/login",
	failureFlash: true,
	successFlash: 'Welcome to YelpCamp!'
	}), function(req, res){
	
});

//handle logout logic
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "See you later!");
	res.redirect("/campgrounds");
});



module.exports = router;