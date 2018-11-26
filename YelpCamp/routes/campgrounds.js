let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let User = require("../models/user");

router.get('/', (req, res) => {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

router.post('/', (req, res) => {
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

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
    // console.log(req.params);
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

module.exports = router;