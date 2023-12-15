const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const database = require("./database");
const cookieSession = require('cookie-session');

// const morgan = require('morgan');
// const methodOverride = require('method-override');
// const ENV = process.env.ENV || "development";

//DB - to be transferred

//APP
// app.use(cors());
app.use(cors(
    {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
));
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'session',
    secret: 'me',
    // Cookie Options
    // maxAge: 2592000
    maxAge: 1000
  }));

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
    .post(function(req, res) {
        // const email = req.params.email
        // console.log('req', req.params.email)
        // console.log('login params', req)
        database.loginUser(req.body.email, req.body.password)
            .then(user => {
                //set cookie
                req.session.userid = user.id;
                // console.log('data', data)
                res.send({ user: user });
            })
})

router.route('/createuser')
    .post(function(req, res) {
        // const email = req.params.email
        // console.log('req', req.params.email)
        // console.log('login params', req)
        database.createUser(req.body.email, req.body.password, req.body.dob)
            .then(user => {
                // console.log('data', data)
                res.send({ user: user });
            })
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
