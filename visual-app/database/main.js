const Promise = require('bluebird')
const AppDAO = require('./dao')
const SensorData = require('./sensor_data')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const blogProjectData = { name: 'r2d2' }
  const data = new SensorData(dao)
  //let projectId

  data.createTable()
    // .then(() => data.create('sensor1', 243, 1659461381460))
    // .then(() => data.create('sensor1', 256, 1659461581460))
    // .then(() => data.create('sensor1', 260, 1659461781460))
    // .then(() => data.create('sensor1', 259, 1659462481460))
    // .then(() => data.create('sensor1', 230, 1659462581460))
    .then(() => data.getAllPast())
    .then((sensor) => {
      console.log(`\nRetreived project from database`)
      // console.log(`project id = ${sensor.id}`)
      // console.log(`project sensor_name = ${sensor.sensor_name}`)
      // console.log(`project sensor_value = ${sensor.sensor_value}`)
      // console.log(`project time = ${sensor.time}`)
      console.log(sensor)
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()
