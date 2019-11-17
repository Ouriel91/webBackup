var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", 
				 {useUnifiedTopology: true, 
				  useNewUrlParser: true, 
				  useCreateIndex: true });

// POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/*
var newUser = new User({
    email: "ozah@gmail.com",
	name: "Oz Ohayon"
});

newUser.posts.push({
    title: "I love Luli Songs",
    content: "Espcially i love Pitzi"
});

newUser.save(function(err, user){
  if(err){
      console.log(err);
  } else {
      console.log(user);
  }
});
*/

/*
var newPost = new Post({
     title: "Reflections on Apples",
   	content: "They are delicious"
});

newPost.save(function(err, post){
     if(err){
        console.log(err);
     } else {
         console.log(post);
     }
});*/


User.findOne({email: "ozah@gmail.com"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "I love Hanuka spinner",
            content: "Please spin it to me"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});