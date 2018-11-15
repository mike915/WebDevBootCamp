let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let seedDB = require("./seeds");

let app = express();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

seedDB();
    
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    
    let newCampground = {
        name: name,
        image: image,
        description: desc
    };
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    // console.log(req.params);
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The YelpCamp Server Has Started ${process.env.IP}:${process.env.PORT}`);
});