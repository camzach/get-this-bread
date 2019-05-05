require('custom-env').env(true);

const phone = require('phone');
const cron = require('node-cron');

const store = require('./store');
const express = require('express');
const bodyParser = require('body-parser');


const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

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
    const phoneNumber = phone(req.params.phone, '');
    if (!(phoneNumber[0] && phoneNumber[1] === 'USA')) {
        res.sendStatus(400);
    } else {
        store.deleteUser(phoneNumber[0]).then(() => res.sendStatus(200));
    }
});

cron.schedule(process.env.CRON_SCHEDULE, () => {
    Promise.all([store.getGreetings(), store.getUsers()]).then((responses) => {
        const greetings = responses[0];
        const users = responses[1];
        users.forEach((user) => {
            console.log(`Sending a text to ${user.nickname} at ${user.phone}.`);
            client.messages.create({
                body: `Good morning, ${user.nickname}! ${greetings[Math.floor(Math.random() * greetings.length)]['greeting']}`,
                to: user.phone,
                from: process.env.TWILIO_NUMBER
            });
        });
    });
});