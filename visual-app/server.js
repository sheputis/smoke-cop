var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  // var one1 = [
  //     { y: 2012, x: 21},
  //     { y: 1996, x: 23},
  //     { y: 2013, x: 25}
  //   ];
  // var two2 = [
  //     { y: 2002, x: 21},
  //     { y: 1980, x: 23},
  //     { y: 2030, x: 25}
  //   ];

  // var one1 = [
  //   { y: 2012, x: [2012, 06, 18, 21] },
  //   { y: 1996, x: [2012, 06, 18, 22] },
  //   { y: 2013, x: [2012, 06, 18, 23] }
  // ];
  // var two2 = [
  //   { y: 2002, x: [2012, 06, 18, 21] },
  //   { y: 1980, x: [2012, 06, 18, 22] },
  //   { y: 2030, x: [2012, 06, 18, 23] }
  // ];
  
  var one1 = [
    { y: 2012, x: 0 },
    { y: 1996, x: 1000 },
    { y: 2013, x: 4000 }
  ];
  var two2 = [
    { y: 2002, x: 0 },
    { y: 1980, x: 1000 },
    { y: 2030, x: 4000 }
  ];

  res.render('index',  { one: one1, two: two2 });
});

// // about page
// app.get('/about', function(req, res) {
//   res.render('pages/about');
// });

app.listen(8080);
console.log('Server is listening on port 8080');
