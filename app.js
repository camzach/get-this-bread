require('dotenv').config();

const phone = require('phone');

const store = require('./store');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/user', (req, res) => {
    const phoneNumber = phone(req.body.phone, '');
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

app.delete('/user/:phone', (req, res) => {
    if (req.params["phone"]) {
        store.deleteUser(req.params["phone"]).then(() => res.sendStatus(200));
    } else {
        res.sendStatus(400);
    }
});
