require('custom-env').env(true);

const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

const cron = require('node-cron');
const store = require("./store");

const greetings = require('./greetings');
let events = {};

function initialize(userPromise) {
    events = userPromise.then(users => {
        let events = {};
        users.forEach(user => {
            addUser(user);
        });
        return events;
    });
}

function addUser(user) {
    if (events[user.sendTime]) {
        events[user.sendTime] = [...events[user.sendTime], user];
    } else {
        console.log(`Creating cron schedule for ${user.sendTime}`);
        events[user.sendTime] = [user];
        const h = user.sendTime.split(":")[0];
        const m = user.sendTime.split(":")[1];
        const cronExpression = `${m} ${h} * * *`;
        cron.schedule(cronExpression, () => {
            events[user.sendTime].forEach((user) => {
                console.log(`Sending a text to ${user.nickname} at ${user.phone}.`);
                // client.messages.create({
                //     body: `Good morning, ${user.nickname}! ${greetings[Math.floor(Math.random() * greetings.length)]['greeting']}`,
                //     to: user.phone,
                //     from: process.env.TWILIO_NUMBER
                // });
            });
        });
    }
}

module.exports = {initialize, addUser};
