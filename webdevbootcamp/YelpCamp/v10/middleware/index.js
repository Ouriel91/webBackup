var Campground		= require("../models/campground");
var Comment			= require("../models/comment");
var middlewareObj 	= {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
	
	//user logged in?
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			} else{
				 
				//it's the user campground?
				if(foundCampground.author.id.equals(req.user._id)){ 
					//no === here because foundCampground.author.id is object while req.user._id is a string, 
					//we use in equals method of mongoose
					next();
				} else{
					res.redirect("back");
				}
			}
		});	
		
	}else{
		
		res.redirect("back");
	}	
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	
	//user logged in?
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else{
				 
				//it's the user comment?
				if(foundComment.author.id.equals(req.user._id)){ 
					//no === here because foundCampground.author.id is object while req.user._id is a string, 
					//we use in equals method of mongoose
					next();
				} else{
					res.redirect("back");
				}
			}
		});	
		
	}else{
		
		res.redirect("back");
	}	
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next(); //continue in code
	}
	res.redirect("/login");
}

module.exports = middlewareObj;