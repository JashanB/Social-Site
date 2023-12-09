const express = require("express");
const app = express();
const database = require("./database");
const morgan = require('morgan');
const methodOverride = require('method-override');
const ENV = process.env.ENV || "development";

app.use(morgan('dev'));

app.set("view engine", "ejs");
// let db_con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: ''
// });

// db_con.connect((err) => {
//     if (err) {
//       console.log("Database Connection Failed !!!", err);
//     } else {
//       console.log("connected to Database");
//     }
// });
  
// module.exports = db_con;

// const database = require('./sqlConnection');

app.listen(8000, () => {
    console.log(`Server is up and running on 8000 ...`);
  });
  