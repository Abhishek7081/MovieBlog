var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Movie = require("../models/movie");
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        bio:req.body.bio,
        avatar: req.body.avatar
    });
    // eval(require('locus'))
    if(req.body.adminCode === 'abcdefghijkl'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Movie Transaction " + user.username);
           res.redirect("/movies");
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/movies",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/movies");
});

// show user's profile
router.get("/users/:id",function(req,res){
   User.findById(req.params.id,function(err,foundUser){
      if(err){
          req.flash("error","Something went wrong!");
          res.redirect("/");
      }
      Movie.find().where('author.id').equals(foundUser._id).exec(function(err,movies){
         if(err){
          req.flash("error","Something went wrong!");
          res.redirect("/");
         }
        res.render("users/show",{user:foundUser ,movies:movies});
      });
   });
});

// EDIT User's Detail form
router.get("/users/:id/edit",middleware.checkUserOwnership, function(req, res){
    // eval(require('locus'));
    User.findById(req.params.id, function(err, foundUser){
        res.render("users/edit", {user: foundUser});
    });
});


// UPDATE User's details
router.put("/users/:id",middleware.checkUserOwnership, function(req, res){
    // find and update the  user
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           res.redirect("/movies");
       } else {
           //redirect somewhere(show page)
           res.redirect("/users/" + req.params.id);
       }
    });
});



module.exports = router;