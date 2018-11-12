let mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/blogv2_app', { useNewUrlParser: true }); 

// USER -email, name
// POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

let User = mongoose.model('User', userSchema);
let Post = mongoose.model('Post', postSchema);

// Post.create({
//     title: 'How cook the best berger pt.3',
//     content: 'blah blah blah fdsfdsfds'
// }, function(err, post) {
//     User.findOne({email: 'bob@gmail.com'}, function(err, foundUser) {
//         if(err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data) {
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});