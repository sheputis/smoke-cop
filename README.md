This project is meant to solve one very specific problem: A smoking neighbour.

### Visualisation (visual-app)

The front-end is written in Nodejs. Go to **./visual-app** and

* Install packages: `npm install`
* Run server `node server.js`

The port number will be printed, use it to open the visualisation in the browser (For example http://localhost:8080/ if you are running the server directly on your device)

The server will be accessing the **./databse/database.sqlite3** file to plot the data. The format there must be as follows:

- `sensor_name: [String]`
- `sensor_value: [Integer]`
- `time_utc: [Integer] (milliseconds since 1970)`
