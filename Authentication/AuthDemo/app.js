let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let User = require("./models/user");



let app = express();
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.use(require("express-session")({
    secret: 'Rusty is the best and custet dog in the world',
    resave: false,
    saveUninitialized: false
}));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server has started!!! ${process.env.IP}:${process.env.PORT}`);
});