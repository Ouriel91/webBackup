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
        image: "https://mashatu.com/wp-content/uploads/2019/03/TentCamp_1-1024x683.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

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
