const knex = require('knex')(require('./knexfile'));

module.exports = {
    createUser ({ nickname, phone }) {
        console.log(`Add user ${nickname} with phone ${phone}`);
        return knex('user').insert({
            nickname, phone
        })
    }
};