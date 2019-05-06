exports.up = function (knex, Promise) {
    return knex.schema.dropTableIfExists('greeting');
};

exports.down = function (knex, Promise) {
    return knex.schema.createTable('greeting', function (t) {
        t.string('greeting').notNullable();
    })
};
