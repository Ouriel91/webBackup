var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", 
				 {useUnifiedTopology: true, 
				  useNewUrlParser: true, 
				  useCreateIndex: true });


var Post = require("./models/post");
var User = require("./models/user");


/*User.create({
	email: "ozezi@gmail.com",
	name:"Oz Ohayon"
});*/

Post.create({
	title:"I love kitten Book",
	content:"Please read me it"
}, function(err,post){
	if(err){
		console.log(err);
	}else{
		//console.log(post);
		User.findOne({email:"ozezi@gmail.com"}, function(err, foundUser){
			if(err){
				console.log(err);
			}else{
				foundUser.posts.push(post);
				foundUser.save(function(err, data){
					if(err){
						console.log(err);
					}
					else{
						console.log(data);
					}
				});
			}
		});
	}
});


// find User
// find all posts for that user

/*User.findOne({email: "ozezi@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
})*/

