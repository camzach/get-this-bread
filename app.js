require('dotenv').config();

const mysql = require('mysql');
const phone = require('phone');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT
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
                phone: phoneNumber[0]
            })
            .then(() => res.sendStatus(200))
    }
});

connection.end();