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
    const res = await dbParams.query(`SELECT * FROM users WHERE email LIKE '${email}'`);
    // console.log(res.rows)
    return res.rows;
}

async function loginUser (email, password) {
    const res = await dbParams.query(`SELECT * FROM users WHERE email LIKE '${email}' AND password LIKE '${password}'`);
    // console.log(res.rows)
    // return res.rows;
    if (res) {
        user = res.rows[0];
      } else {
        user = null;
      }
      return user;
}

async function searchUsersWithEmail (email) {
    const res = await dbParams.query(`SELECT * FROM users WHERE email LIKE '%${email}%'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllPostsForUser (id) {
    const res = await dbParams.query(`SELECT * FROM posts WHERE user_id LIKE '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllLikesForUser (id) {
    const res = await dbParams.query(`SELECT * FROM likes WHERE user_id LIKE '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllSavesForUser (id) {
    const res = await dbParams.query(`SELECT * FROM saves WHERE user_id LIKE '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

exports.getAllUsers = getAllUsers;
exports.loginUser = loginUser;
exports.findUserWithEmail = findUserWithEmail;
exports.searchUsersWithEmail = searchUsersWithEmail;
exports.getAllPostsForUser = getAllPostsForUser;
exports.getAllLikesForUser = getAllLikesForUser;
exports.getAllSavesForUser = getAllSavesForUser;

// getAllUsers();

// function getUserWIthEmail (email) {

// }