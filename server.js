const express = require("express");
const mysql = require("mysql");
const app = express();
// const database = require("./db");

let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ''
});

db_con.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  
module.exports = db_con;

// const database = require('./sqlConnection');

app.listen(8000, () => {
    console.log(`Server is up and running on 8000 ...`);
  });
  