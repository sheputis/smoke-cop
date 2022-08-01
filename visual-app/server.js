var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {

  var sensor_values = [
    { sensor_name: 'sensor1', sensor_value: 2012, time_utc: 0 },
    { sensor_name: 'sensor1', sensor_value: 3000, time_utc: 1000 },
    { sensor_name: 'sensor1', sensor_value: 4000, time_utc: 2000 },
    { sensor_name: 'sensor2', sensor_value: 1000, time_utc: 3000 },
    { sensor_name: 'sensor2', sensor_value: 1500, time_utc: 4000 },
    { sensor_name: 'sensor2', sensor_value: 2300, time_utc: 5000 },
    { sensor_name: 'sensor3', sensor_value: 2800, time_utc: 6000 },
    { sensor_name: 'sensor3', sensor_value: 3100, time_utc: 7000 },
  ];

  const grouped_sensor_values = sensor_values.reduce((group, element) => {
    const { sensor_name } = element;
    group[sensor_name] = group[sensor_name] || [];
    group[sensor_name].push(element);
    return group;
  }, {});

  res.render('index',  { grouped_sensor_values: grouped_sensor_values });
});

// // about page
// app.get('/about', function(req, res) {
//   res.render('pages/about');
// });

app.listen(8080);
console.log('Server is listening on port 8080');
