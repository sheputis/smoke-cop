var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  var values = [
      { y: 2012},
      { y: 1996},
      { y: 2013}
    ];
  res.render('index',  { values: values });
});

// // about page
// app.get('/about', function(req, res) {
//   res.render('pages/about');
// });

app.listen(8080);
console.log('Server is listening on port 8080');
