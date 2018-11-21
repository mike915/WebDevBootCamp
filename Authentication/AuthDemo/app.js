let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let User = require("./models/user");

let app = express();
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true }); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/secret');
        });
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res) {
    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server has started!!! ${process.env.IP}:${process.env.PORT}`);
});