const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
// const database = require("./database");
// const morgan = require('morgan');
// const methodOverride = require('method-override');
// const ENV = process.env.ENV || "development";

//DB - to be transferred
const { Pool } = require("pg");
const dotenv = require("dotenv");
const dbParams = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
dotenv.config();
const connectDb = async () => {
    try {
        // const pool = new Pool({
        //     user: process.env.PGUSER,
        //     host: process.env.PGHOST,
        //     database: process.env.PGDATABASE,
        //     password: process.env.PGPASSWORD,
        //     port: process.env.PGPORT,
        // });
        await dbParams.connect()
        // const res = await dbParams.query('SELECT * FROM users')
        // console.log(res.rows)
        // await dbParams.end()
    } catch (error) {
        console.log(error)
    }
}
connectDb()

async function getAllUsers () {
    const res = await dbParams.query('SELECT * FROM users');
    console.log(res.rows)
}
getAllUsers();
//APP
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users/:user_id')
    .get(function(req, res) {

    })
app.use('/api', router);

// app.get('/message', (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

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
