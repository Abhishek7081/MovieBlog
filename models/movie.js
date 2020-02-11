var mongoose = require("mongoose");
var movieSchema = new mongoose.Schema({
    name: String,
    genre:String,
    image: String,
    link: String,
    description:String,

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    ]
});
module.exports = mongoose.model("Movie" , movieSchema);
