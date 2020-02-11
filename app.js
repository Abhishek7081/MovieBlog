var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Movie       = require("./models/movie"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

//requiring routes
var commentRoutes    = require("./routes/comments"),
    movieRoutes = require("./routes/movies"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/movies");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.set('port',process.env.PORT || 3000);/
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//  seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Iron man Wins the race!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);

app.listen(8000, function(){
   console.log("The Movie Server Has Started!");
});
// http.createServer(app).listen(app.get('port', function(){
//    console.log("The Movie Server Has Started!");
// }));
 