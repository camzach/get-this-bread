const knex = require('knex')(require('./knexfile'));

module.exports = {
    createUser({nickname, phone, sendTime}) {
        console.log(`Add user ${nickname} with phone ${phone}`);
        return knex('user').insert({
            nickname, phone, sendTime
        })
    },

    getUsers() {
        return knex('user').select('nickname', 'phone', 'sendTime');
    },

    deleteUser(phone) {
        console.log(`Removing user with phone ${phone}`);
        return knex('user').where({phone}).del();
    }
};
