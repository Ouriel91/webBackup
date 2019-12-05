var Campground		= require("../models/campground");
var Comment			= require("../models/comment");
var middlewareObj 	= {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
	
	//user logged in?
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err || !foundCampground){ //!foundCampground means that campground is null
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else{
				 
				//it's the user campground?
				if(foundCampground.author.id.equals(req.user._id)){ 
					//no === here because foundCampground.author.id is object while req.user._id is a string, 
					//we use in equals method of mongoose
					next();
				} else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});	
		
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	
	//user logged in?
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else{
				 
				//it's the user comment?
				if(foundComment.author.id.equals(req.user._id)){ 
					//no === here because foundCampground.author.id is object while req.user._id is a string, 
					//we use in equals method of mongoose
					next();
				} else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});	
		
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next(); //continue in code
	}
	req.flash("error", "You need to be logged in to do that"); //error is a flage to get message from login route
	res.redirect("/login");
}

module.exports = middlewareObj;