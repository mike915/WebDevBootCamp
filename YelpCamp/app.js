let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Schema Setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

Campground.create()

let campgrounds = [
    { name: 'Salmon Creek', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'},
    { name: 'Granite Hill', image: 'https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144594f1c878a4e5bc_340.jpg'},
    { name: 'Mountain Coats Rest', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'},
    { name: 'Salmon Creek', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'},
    { name: 'Granite Hill', image: 'https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144594f1c878a4e5bc_340.jpg'},
    { name: 'Mountain Coats Rest', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'}
];
    
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
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The YelpCamp Server Has Started ${process.env.IP}:${process.env.PORT}`);
});