var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment = require("./models/comment");

var data = [
        {
            name: "Iron Man",
            image: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/iron-man-wallpaper-22-768x432.jpg",
            link: "https://www.youtube.com/watch?v=rw4qhsR62Lk",
            description: "Iron Man  is a 2010 American superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Paramount Pictures."
        },
        {
            name: "Iron Man",
            image: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/iron-man-wallpaper-22-768x432.jpg",
            link: "https://www.youtube.com/watch?v=rw4qhsR62Lk",
            description: "Iron Man  is a 2010 American superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Paramount Pictures."
        },
        {
            name: "Iron Man",
            image: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/iron-man-wallpaper-22-768x432.jpg",
            link: "https://www.youtube.com/watch?v=rw4qhsR62Lk",
            description: "Iron Man  is a 2010 American superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Paramount Pictures."
        },
        {
            name: "Iron Man",
            image: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/iron-man-wallpaper-22-768x432.jpg",
            link: "https://www.youtube.com/watch?v=rw4qhsR62Lk",
            description: "Iron Man  is a 2010 American superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Paramount Pictures."
        }
]

function seedDB(){
    //remove all movies
    Movie.remove({},function(err){
       if(err){
           console.log(err);
       }
         console.log("removed movie!");
         //Add some movies
         data.forEach(function(seed){
           Movie.create(seed,function(err,movie){
               if(err){
                   console.log(err);
               } else {
                   console.log("added a movie");
                   //create a comment
                   Comment.create(
                       {
                           text: "WOW WOW WOW WOW",
                           author: "Homer"
                       },function(err,comment){
                           if(err){
                               console.log(err);
                           }
                           else{
                             movie.comments = comment ;
                             movie.save();
                             console.log("Create new comment");
                           }
                         }
                     );
               }
           });
         });
    });
}

//module.exports = seedDB;
