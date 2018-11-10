let mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true }); 

// USER -email, name
// POST - title, content
let  postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let  userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

let User = mongoose.model('User', userSchema);
let Post = mongoose.model('Post', postSchema);

// let newUser = new User({
//     email: 'hermione@hogwarts.edu',
//     name: 'Hermione Hogwarts'
// });

// newUser.posts.push({
//     title: 'How to bre',
//     content: 'Just kdding'
// });

// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// let newPost = new Post({
//     title: 'Reflections on Apples',
//     content: 'They are delicious'
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: 'Hermione Hogwarts'}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        user.posts.push({
            title: '2 things',
            content: 'Voldemort'
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        })
    }
});