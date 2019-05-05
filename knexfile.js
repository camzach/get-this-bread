require('custom-env').env(true);

module.exports = {
    client: 'mysql',
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
};