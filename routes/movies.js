var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware");


//INDEX - show all movies
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all movies from DB
        Movie.find({name: regex}, function(err, allMovies){
           if(err){
               console.log(err);
           } else {
              if(allMovies.length < 1) {
                  noMatch = "No Movies match that query, please try again.";
              }
              res.render("movies/index",{movies:allMovies, noMatch: noMatch});
           }
        });
    } else {
        // Get all movies from DB
        Movie.find({}, function(err, allMovies){
           if(err){
               console.log(err);
           } else {
              res.render("movies/index",{movies:allMovies, noMatch: noMatch});
           }
        });
    }
});

router.get("/scifi", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/scifi",{movies:allMovies});
        }
    });
});


router.get("/action", function(req, res){
        // Get all movies from DB
        Movie.find({}, function(err, allMovies){
            if(err){
                console.log(err);
            } else {
                res.render("movies/action",{movies:allMovies});
            }
        });
});

router.get("/romantic", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/romantic",{movies:allMovies});
        }
    });
});

router.get("/romantic", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/romantic",{movies:allMovies});
        }
    });
});


router.get("/mystery", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/mystery",{movies:allMovies});
        }
    });
});

router.get("/drama", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/drama",{movies:allMovies});
        }
    });
});

router.get("/fantasy", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/fantasy",{movies:allMovies});
        }
    });
});




//CREATE - add new movie to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to movies array
    var name = req.body.name;
    var genre =req.body.genre;
    var image = req.body.image;
    var desc = req.body.description;
    var link = req.body.link;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovie = {name: name, genre:genre , image: image, description: desc,link: link , author:author}
    // Create a new movie and save to DB
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to movies page
            console.log(newlyCreated);
            res.redirect("/movies");
        }
    });
});

//NEW - show form to create new movie
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("movies/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

// EDIT MOVIE ROUTE
router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        res.render("movies/edit", {movie: foundMovie});
    });
});

// UPDATE MOVIE ROUTE
router.put("/:id",middleware.checkMovieOwnership, function(req, res){
    // find and update the correct movie
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
       if(err){
           res.redirect("/movies");
       } else {
           //redirect somewhere(show page)
           res.redirect("/movies/" + req.params.id);
       }
    });
});

// DESTROY MOVIE ROUTE
router.delete("/:id",middleware.checkMovieOwnership, function(req, res){
   Movie.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/movies");
      } else {
          res.redirect("/movies");
      }
   });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;