exports.up = function (knex, Promise) {
    return knex.schema.table('user', t => {
        t.time("sendTime").notNullable().defaultTo("6:00");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('user', t => {
        t.dropColumn('sendTime');
    })
};
