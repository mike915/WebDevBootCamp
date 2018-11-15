let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogv2_app', { useNewUrlParser: true }); 

let Post = require("./models/post");
let User = require("./models/user");

Post.create({
    title: 'How cook the best berger pt.3',
    content: 'blah blah blah'
}, function(err, post) {
    User.findOne({email: 'bob@gmail.com'}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });