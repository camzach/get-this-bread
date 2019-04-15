var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "breadbotdb.cmhbynacteb0.us-east-1.rds.amazonaws.com",
    user: "breadmaster",
    password: "breadmaster",
    port: 3306
});

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

connection.end();