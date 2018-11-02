let express = require("express");
let app = express();
let request = require("request");

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('search'); 
});

app.get('/results', function(req, res) {
    let query = req.query.search;
    let url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
    
    request(url, function(err, response, body) {
        if (!err && res.statusCode === 200) {
            let data = JSON.parse(body);
            res.render('results', {data: data});
            // res.send(data['Search']);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Movie App has started!!! ${process.env.IP}:${process.env.PORT}`);
});