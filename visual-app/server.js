var express = require('express');
var app = express();

const Promise = require('bluebird')
const AppDAO = require('./database/dao')
const SensorData = require('./database/sensor_data')

function group(sensor_values) {
  return sensor_values.reduce((group, element) => {
    const { sensor_name } = element;
    group[sensor_name] = group[sensor_name] || [];
    group[sensor_name].push(element);
    return group;
  }, {});
}

function time_now() {
  return new Date().getTime();
}

function past_ten_minutes() {
  return time_now() - 600000;
}

function past_two_hours() {
  return time_now() - 7200000;
}

// 24 hours
function past_day() {
  return time_now() - 86400000;
}

// 7 days
function past_week() {
  return time_now() - 604800000;
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  const dao = new AppDAO('../database/database.sqlite3')
  const data = new SensorData(dao)

  const sensor_values = {};
  data.createTable()
  // .then(() => data.create('sensor2', 99,  1659461401460)) // upload dummy values
  .then(() => data.getAllPast(past_ten_minutes()) )
  .then((result) => sensor_values['past_ten_mins'] = result)
  .then(() => data.getAllPast(past_two_hours()) )
  .then((result) => sensor_values['past_two_hours'] = result)
  .then(() => data.getAllPast(past_day()) )
  .then((result) => sensor_values['past_day'] = result)
  //.then(() => data.getAllPast(past_week()) )
  //.then((result) => sensor_values['past_week'] = result)
  .then(() => {
    console.log(`\nRetreived sensor data from database`)
    const grouped_past_ten_mins  = group(sensor_values['past_ten_mins']);
    const grouped_past_two_hours = group(sensor_values['past_two_hours']);
    const grouped_past_day       = group(sensor_values['past_day']);
    // const grouped_past_week      = group(sensor_values['past_week']);
    res.render('index',
              { grouped_past_ten_mins: grouped_past_ten_mins,
                grouped_past_two_hours: grouped_past_two_hours,
                grouped_past_day: grouped_past_day });
               // grouped_past_week: grouped_past_week 
  })
  .catch((err) => {
    console.log('Error: ')
    console.log(JSON.stringify(err))
  })
});

app.listen(8080);
console.log('Server is listening on port 8080');
