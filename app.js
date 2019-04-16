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

const store = require('./store');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/createUser', (req, res) => {
    store
        .createUser({
            nickname: req.body.nickname,
            phone: req.body.phoneNumber
        })
        .then(() => res.sendStatus(200))
});

connection.end();