let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let methodOverride = require("method-override");

let app = express();
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true }); 
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

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

// INDEX
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// NEW
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// CREATE
app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render('new');
        } else {
            res.redirect('blogs');
        }
    });
});

// SHOW
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

// EDIT
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect('blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// UPDATE
app.put('/blogs/:id', function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog) {
        if(err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The Blog Server Has Started ${process.env.IP}:${process.env.PORT}`);
});