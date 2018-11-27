let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let methodOverride = require("method-override");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let User = require("./models/user");
let seedDB = require("./seeds");

let commentRoutes = require("./routes/comments");
let campgroundRoutes = require("./routes/campgrounds");
let indexRoutes = require("./routes/index");

let app = express();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// seedDB();

// Passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The YelpCamp Server Has Started ${process.env.IP}:${process.env.PORT}`);
});