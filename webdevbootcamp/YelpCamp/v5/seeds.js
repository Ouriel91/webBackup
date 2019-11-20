var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment		= require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
