// project_repository.js

class SensorData {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS sensor_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_name TEXT,
      sensor_value INTEGER,
      time INTEGER`
    return this.dao.run(sql)
  }

  create(name) {
    return this.dao.run(
      'INSERT INTO sensor_values (sensor_name) VALUES (?)',
      [name])
  }
}

module.exports = SensorData;
