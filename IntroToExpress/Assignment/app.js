let express = require("express");
let app = express();

app.get('/', function(req, res) {
    res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', function(req, res) {
    let animal = req.params.animal.toLowerCase();
    let sounds = {
       pig: 'Oink',
       cow: 'Moo',
       dog: 'Woof Woof',
       cat: 'I hate you human',
       goldfish: '...'
    };
   
    let sound = sounds[animal];
    res.send(`The ${animal} says '${sound}'`);
});

app.get('/repeat/:sound/:num', function(req, res) {
   let sound = req.params.sound;
   let num = parseInt(req.params.num);
   let ret = '';
   
   for (let i = 0; i < num; i++) {
       ret += sound;
       ret += ' ';
   }
   
   res.send(ret);
});

app.get('/*', function(req, res) {
   res.send('Sorry, page not founc...What are you doing with your life?'); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server has started!!! ${process.env.IP}:${process.env.PORT}`);
});