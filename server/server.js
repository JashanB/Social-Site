const express = require("express");
const cors = require('cors');
const app = express();
// const database = require("./database");
// const morgan = require('morgan');
// const methodOverride = require('method-override');
// const ENV = process.env.ENV || "development";
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
 
const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
        await pool.connect()
        const res = await pool.query('SELECT * FROM users')
        console.log(res.rows)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
 

connectDb()


app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is up and running on 8000`);
});
  

//Prior server code
// app.use(morgan('dev'));
// app.set("view engine", "ejs");
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
