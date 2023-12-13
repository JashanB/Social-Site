const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const database = require("./database");
// const morgan = require('morgan');
// const methodOverride = require('method-override');
// const ENV = process.env.ENV || "development";

//DB - to be transferred

//APP
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();

router.get('/', function(req, res) {
    database.getAllUsers()
        .then(data => {
            console.log(data)
            res.json({ message: data });
        })
});

router.route('/users/:email')
    .get(function(req, res) {
        const email = req.params.email
        // console.log('req', req.params.email)
        // console.log('res', res)
        database.findUserWithEmail(email)
            .then(data => {
                console.log(data)
                res.send({ message: data });
            })
    })

router.route('/profile/:user_id')
    .get(function(req, res) {
        const user = req.params.user_id
        const likes = {};
        const posts = {};
        const saves = {};
        // console.log('req', req.params.email)
        // console.log('res', res)
        database.getAllPostsForUser(user)
            .then(data => {
                console.log(data)
                res.send({ message: data });
            })
    })

    router.route('/login')
    .get(function(req, res) {
        // const email = req.params.email
        // console.log('req', req.params.email)
        console.log('login params', req)
        // database.findUserWithEmail(email)
        //     .then(data => {
        //         console.log(data)
        //         res.send({ message: data });
        //     })
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
