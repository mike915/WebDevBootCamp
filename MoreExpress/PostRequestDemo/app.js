let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let friends = ['Tony', 'Michael', 'Justin', 'Pierre', 'Lily'];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.post('/addfriend', function(req, res) {
    friends.push(req.body.newFriend);
    res.redirect('/friends');
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server is listening!!! ${process.env.IP}:${process.env.PORT}`);
});