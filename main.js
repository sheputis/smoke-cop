const Promise = require('bluebird')
const AppDAO = require('./dao')
const SensorData = require('./sensor_data')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const blogProjectData = { name: 'r2d2' }
  const data = new SensorData(dao)
  //let projectId

  data.createTable()
    // .then(() => data.create('r2d2', 243, 1))
    // .then(() => data.create('r2d2', 256, 2))
    // .then(() => data.create('r2d2', 260, 3))
    // .then(() => data.create('r2d2', 259, 4))
    // .then(() => data.create('r2d2', 230, 5))
    .then(() => data.getAll())
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
