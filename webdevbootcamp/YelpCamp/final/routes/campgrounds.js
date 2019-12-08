var express 	= require("express");
var router		= express.Router();
var Campground	= require("../models/campground");
var Comment		= require("../models/comment");
var middleware	= require("../middleware");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all campgrounds
router.get("/", function(req, res){
	
	var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({$or: [{name: regex}, {location: regex}, {"author.username":regex}]}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
             if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
           }
        });
    }
	else{
		// Get all campgrounds from DB
		Campground.find({}, function(err, allCampgrounds){
		   if(err){
			   console.log(err);
		   } else {
			  res.render("campgrounds/index",{campgrounds:allCampgrounds, page:"campgrounds" , noMatch: noMatch});
		   }
		});
	}
    
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn,function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
	var cost = req.body.cost;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
    var newCampground = {name: name, cost:cost, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
			console.log(err);
			req.flash("error", "Something went wrong");
        } else {
            //redirect back to campgrounds page
			req.flash("success", "Successfully added Campground");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){//!foundCampground means that campground is null
            req.flash("error", "Campground not found");
			res.redirect("back");
        } else {
			//console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT - edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
	
		Campground.findById(req.params.id, function(err,foundCampground){	
			
			res.render("campgrounds/edit", {campground: foundCampground});	
		});	
});

//UPDATE - update campground route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	
var newData = {name: req.body.name, image: req.body.image, cost: req.body.cost, description: req.body.description};	
//find and update the correct route
Campground.findByIdAndUpdate(req.params.id, {$set:newData}, function(err,updatedCampground){
		
		if(err){
			console.log(err);
			res.redirect("/campgrounds", {"error":err.message});
		} else{
			//redirect to show page
			req.flash("success", "Successfully updated Campground");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});

//DESTROY / DELETE- destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved) {
		
        if (err) {
			console.log(err);
			res.redirect("/campgrounds", {"error":err.message});
        }
		
		//delete comments from DB
        Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, function(err) {
            if (err) {
                console.log(err);
            }
			req.flash("success", "Successfully deleted Campground");
            res.redirect("/campgrounds");
        });	
    });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;