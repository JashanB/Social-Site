// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();


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
        await dbParams.connect()
        // await dbParams.end()
    } catch (error) {
        console.log(error)
    }
}
connectDb()

async function getAllUsers () {
    const res = await dbParams.query('SELECT * FROM users');
    // console.log(res.rows)
    return res.rows;
}

async function findUserWithEmail (email) {
    const res = await dbParams.query(`SELECT * FROM users WHERE email LIKE "${email}"`);
    console.log(res.rows)
    return res.rows;
}

exports.getAllUsers = getAllUsers;
exports.findUserWithEmail = findUserWithEmail;

// getAllUsers();

// function getUserWIthEmail (email) {

// }