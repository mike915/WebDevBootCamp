require('dotenv').config();
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
let flash = require("connect-flash");

let commentRoutes = require("./routes/comments");
let campgroundRoutes = require("./routes/campgrounds");
let indexRoutes = require("./routes/index");

let app = express();

console.log('database url: ' + process.env.DATABASEURL);
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true }); 
// mongoose.connect('mongodb://mike915:michael19830915@ds141294.mlab.com:41294/yelp_camp_v1', { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The YelpCamp Server Has Started ${process.env.IP}:${process.env.PORT}`);
});