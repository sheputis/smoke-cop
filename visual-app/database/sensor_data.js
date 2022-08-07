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
      time_utc INTEGER
      )`
    return this.dao.run(sql)
  }

  create(sensor_name, sensor_value, time_utc) {
    return this.dao.run(
      'INSERT INTO sensor_values (sensor_name, sensor_value, time_utc) VALUES (?, ?, ?)',
      [sensor_name, sensor_value, time_utc])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM sensor_values WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM sensor_values`)
  }

  getAllPast(time_utc_reference) {
    return this.dao.all(`SELECT * FROM sensor_values WHERE time_utc > ?`, [time_utc_reference])
  }
}

module.exports = SensorData;
