let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model('Blog', blogSchema);

let testBlog = {
    title: 'Test Blog',
    image: 'https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg',
    body: 'Hello, this is a blog post'
};

let testBlog2 = {
    title: 'Test Blog',
    image: 'https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg',
    body: 'Hello, this is a blog post'
};

// Blog.create(testBlog);

// RESTFUL ROUTES
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

app.get('/blogs/new', function(req, res) {
    res.render('new');
});

app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render('new');
        } else {
            res.redirect('blogs');
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The Blog Server Has Started ${process.env.IP}:${process.env.PORT}`);
});