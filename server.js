var http = require('http'),
    fs   = require('fs');


//const sqlite3 = require('sqlite3').verbose();

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
});
