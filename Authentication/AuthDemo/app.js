let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server has started!!! ${process.env.IP}:${process.env.PORT}`);
});