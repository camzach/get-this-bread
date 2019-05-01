module.exports = {
    createUser({nickname, phone}) {
        console.log(`Add user ${nickname} with phone ${phone}`);
        return knex('user').insert({
            nickname, phone
        })
    },

    deleteUser(phone) {
        console.log(`Removing user with phone ${phone}`);
        return knex('user').where({phone}).del();
    }
};

const knex = require('knex')(require('./knexfile'));
