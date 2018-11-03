let express = require("express");
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    let campgrounds = [
        { name: 'Salmon Creek', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'},
        { name: 'Granite Hill', image: 'https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144594f1c878a4e5bc_340.jpg'},
        { name: 'Mountain Coats Rest', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104491f1c070a6eebdb1_340.jpg'},
    ];
    
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The YelpCamp Server Has Started ${process.env.IP}:${process.env.PORT}`);
});