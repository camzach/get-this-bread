const mysql = require('mysql');
const phone = require('phone');

const connection = mysql.createConnection({
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
    const phoneNumber = phone(req.body.phoneNumber, '');
    if (!(phoneNumber[0] && phoneNumber[1] === 'USA')) {
        res.sendStatus(400);
    } else {
        store
            .createUser({
                nickname: req.body.nickname,
                phone: phoneNumber
            })
            .then(() => res.sendStatus(200))
    }
});

connection.end();