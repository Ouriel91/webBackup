var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserScema = new mongoose.Schema({
	
	username: String,
	password: String
});

UserScema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserScema);