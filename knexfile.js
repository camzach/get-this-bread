require('dotenv').config();

console.log(`the db name is ${process.env.DB_NAME}`);

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