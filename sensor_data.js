// project_repository.js

class SensorData {
  constructor(dao) {
    this.dao = dao
  }

  // 'time' is Unix Time https://www.sqlite.org/datatype3.html, a number of seconds since
  // 1970-01-01 00:00:00 UTC.
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS sensor_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_name TEXT,
      sensor_value INTEGER,
      time INTEGER
      )`
    return this.dao.run(sql)
  }

  create(sensor_name, sensor_value, time) {
    return this.dao.run(
      'INSERT INTO sensor_values (sensor_name, sensor_value, time) VALUES (?, ?, ?)',
      [sensor_name, sensor_value, time])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM sensor_values WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM sensor_values`)
  }
}

module.exports = SensorData;
