require('custom-env').env(true);

const phone = require('phone');

const store = require('./store');
const express = require('express');
const bodyParser = require('body-parser');

const messenger = require('./messenger');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/user', (req, res) => {
    const phoneNumber = phone(req.body.phone, '');
    const sendTime = req.body.sendTime === undefined ? "06:00:00" : req.body.sendTime;
    const newUser = {
        nickname: req.body.nickname,
        phone: phoneNumber[0],
        sendTime: sendTime
    };
    if ((phoneNumber[0] && phoneNumber[1] === 'USA') && newUser.nickname) {
        store.createUser(newUser).then(() => {
            messenger.addUser(newUser);
            res.sendStatus(200)
        });
    } else {
        res.sendStatus(400);
    }
});

app.delete('/user/:phone', (req, res) => {
    const phoneNumber = phone(req.params.phone, '');
    if (!(phoneNumber[0] && phoneNumber[1] === 'USA')) {
        res.sendStatus(400);
    } else {
        store.deleteUser(phoneNumber[0]).then(() => res.sendStatus(200));
    }
});

messenger.initialize(store.getUsers());
