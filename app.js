const mysql = require('mysql');

const con = mysql.createConnection({
    host: "breadbotdb.cmhbynacteb0.us-east-1.rds.amazonaws.com",
    user: "breadmaster",
    password: "breadmaster"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});