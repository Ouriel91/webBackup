var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment		= require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 		labore et dolore magna aliqua."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 		labore et dolore magna aliqua."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 		labore et dolore magna aliqua."
    }
]

/*function seedDB(){
	
	//Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		
		console.log("Removed campgrounds");
		
		//Add few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("added new campground");
					//Add few comments
					Comment.create({
						text:"Great place , I wish i was there!",
						author:"Ouriel"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else{
							campground.comments.push(comment);
							campground.save();
							console.log("New comment added")
						}
						
					});
				}
			});
		});
	});	
}*/

//cleaner and async code
async function seedDB(){
	
	try{
		
		await Campground.deleteMany({});
		console.log("Removed campgrounds");
		
		await Comment.deleteMany({});
		console.log("Removed comments");
		
		for(const seed of data){
			let campground = await Campground.create(seed);
			console.log("Campgrounds created");
			
			let comment = await Comment.create({
				
				text:"Great place , I wish i was there!",
				author:"Ouriel"
			});
			console.log("Comment created");
			
			campground.comments.push(comment);
			campground.save();
			console.log("New comment added to campground")
		}
		
	}catch(err){
		console.log(err);
	}

}


module.exports = seedDB;
