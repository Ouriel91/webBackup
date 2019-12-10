const express 		= require("express");
const router			= express.Router({mergeParams: true});
const Campground		= require("../models/campground");
const Comment 		= require("../models/comment");
const middleware		= require("../middleware");
const { isLoggedIn, checkUserComment, isAdmin } = middleware;

//Comments new
router.get("/new", isLoggedIn ,function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});

//Comments create
router.post("/", isLoggedIn ,function(req, res){
		
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		
		if(err){
			console.log(err);
			res.redirect("/campgrounds", {"error":err.message});
		}else{
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				
				if(err){
					console.log(err);
					req.flash("error", err.message);
				}else{
					
					//connect new comment to campground
					
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save()
					
					campground.comments.push(comment);
					campground.save();
					
					//console.log(comment);
					//redirect campground show page
					req.flash("success", "Successfully added Comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
				
});

//Comment Edit Route
router.get("/:comment_id/edit", isLoggedIn, checkUserComment ,function(req, res){
	
	res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});

//Comment Update Route
router.put("/:comment_id", isAdmin, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("back", {"error":err.message});
		}else{
			req.flash("success", "Successfully updated Comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Comment Destroy/Delete Route
router.delete("/:comment_id",  isLoggedIn, checkUserComment, function(req, res){
	// find campground, remove comment from comments array, delete comment in db
  Campground.findByIdAndUpdate(req.params.id, {
    $pull: {
      comments: req.comment.id
    }
  }, function(err) {
    if(err){ 
        console.log(err)
        req.flash('error', err.message);
        res.redirect('/');
    } else {
        req.comment.remove(function(err) {
          if(err) {
            req.flash('error', err.message);
            return res.redirect('/');
          }
          req.flash('error', 'Comment deleted!');
          res.redirect("/campgrounds/" + req.params.id);
        });
    }
  });
});


module.exports = router;