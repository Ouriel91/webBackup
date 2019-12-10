var Campground		= require("../models/campground");
var Comment			= require("../models/comment");
module.exports 	= {
	
	isLoggedIn : function(req, res, next){
		if(req.isAuthenticated()){
			return next(); //continue in code
		}
		req.flash("error", "You need to be logged in to do that"); //error is a flage to get message from login route
		res.redirect("/login");
	},
	
	
	checkUserCampground : function(req, res, next){
	
		Campground.findById(req.params.id, function(err, foundCampground){
			
			if(err || !foundCampground){ //!foundCampground means that campground is null
				console.log(err);
          		req.flash('error', 'Sorry, that campground does not exist!');
          		res.redirect('/campgrounds');
			}
			//it's the user campground? user is admin?
			else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
				req.campground = foundCampground;
         		next();
			}
			else{
				req.flash('error', 'You don\'t have permission to do that!');
          		res.redirect('/campgrounds/' + req.params.id);
			}
		});	
	},
	
	checkUserComment :  function(req, res, next){

		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				console.log(err);
				req.flash('error', 'Sorry, that comment does not exist!');
				res.redirect('/campgrounds');
			}
			//it's the user comment? user is admin?
			else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
				req.comment = foundComment;
            	next();
			}
			else{
				req.flash('error', 'You don\'t have permission to do that!');
           		res.redirect('/campgrounds/' + req.params.id);
			}
		});		
	},
	
	isAdmin: function(req, res, next){
		if(req.user.isAdmin){
			next();
		}
		else {
		  req.flash('error', 'This site is now read only thanks to spam and trolls.');
		  res.redirect('back');
		}
	},
	
	isSafe: function(req, res, next) {
		if(req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
		  next();
		}else {
		  req.flash('error', 'Only images from images.unsplash.com allowed.\nSee https://youtu.be/Bn3weNRQRDE for how to copy image urls from unsplash.');
		  res.redirect('back');
		}
	  }
}







