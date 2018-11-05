let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }); 

let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

let Cat = mongoose.model('Cat', catSchema);

Cat.create({
    name: 'Snow White',
    age: 15,
    temperament: 'Bland'
}, function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

// let george = new Cat({
//     name: 'George',
//     age: 11,
//     temperament: 'Grouchy'
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log('something went wrong');
//     } else {
//         console.log('jst save');
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats) {
    if(err) {
        console.log('Oh no');
        console.log(err);
    } else {
        console.log('All the cats...');
        console.log(cats);
    }
});