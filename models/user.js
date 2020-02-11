var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar:String,
    firstName:String,
    lastName:String,
    bio:String,
    email:String,
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // },
    isAdmin : {type: Boolean , default: false}
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , UserSchema);
