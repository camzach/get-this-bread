var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "breadbotdb.cmhbynacteb0.us-east-1.rds.amazonaws.com",
    user: "breadmaster",
    password: "breadmaster",
    port: 3306
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('HEY!')
});

app.listen(3000, () => console.log('Server running on port 3000'));

connection.end();