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


// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  const dao = new AppDAO('../database/database.sqlite3')
  const data = new SensorData(dao)

  data.createTable()
  // .then(() => data.create('sensor2', 99,  1659461401460)) // upload dummy values
  // .then(() => data.create('sensor2', 132, 1659461681460))
  // .then(() => data.create('sensor2', 121, 1659461981460))
  // .then(() => data.create('sensor2', 259, 1659462581460))
  // .then(() => data.create('sensor2', 230, 1659462881460))
  .then(() => data.getAll())
  .then((sensor) => {
    console.log(`\nRetreived sensor data from database`)
    
    const grouped_sensor_values = group(sensor)
    res.render('index',  { grouped_sensor_values: grouped_sensor_values });
  })
  .catch((err) => {
    console.log('Error: ')
    console.log(JSON.stringify(err))
  })
});

app.listen(8080);
console.log('Server is listening on port 8080');
