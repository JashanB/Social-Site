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

//Testing function
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

async function createUser (email, password, dob) {
    const res = await dbParams.query(`INSERT into users (email, password, dob) VALUES ('${email}', '${password}', '${dob}') RETURNING *`)
    .then(function (res) {
        return res.rows[0];
      })
}

async function deleteUser (email, password) {
    const res = await dbParams.query(`DELETE from users WHERE email = '${email}' AND password = '${password}'`)
    .then(function (res) {
        return res.rows[0];
      })
}

async function searchUsersWithEmail (email) {
    const res = await dbParams.query(`SELECT * FROM users WHERE email LIKE '%${email}%'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllPostsForUser (id) {
    const res = await dbParams.query(`SELECT * FROM posts WHERE user_id = '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllLikesForUser (id) {
    const res = await dbParams.query(`SELECT * FROM likes WHERE user_id = '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllSavesForUser (id) {
    const res = await dbParams.query(`SELECT * FROM saves WHERE user_id = '${id}'`);
    // console.log(res.rows)
    return res.rows;
}

async function getAllFriendsForUser (id) {
    const res = await dbParams.query(`SELECT friends_id FROM friends WHERE user_id = '${id}'`);
    return res.rows;
}

async function getAllPostsFromFriends (id) {
    //for each friend, search all posts
    
}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.findUserWithEmail = findUserWithEmail;
exports.searchUsersWithEmail = searchUsersWithEmail;
exports.getAllPostsForUser = getAllPostsForUser;
exports.getAllLikesForUser = getAllLikesForUser;
exports.getAllSavesForUser = getAllSavesForUser;
exports.getAllFriendsForUser = getAllFriendsForUser;