const express = require('express');
const con = require('../../config/mysqlCon.js');
const router = express.Router();
var session = require('express-session');
const sessionStore = require('connect-session-knex');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'a',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  },
  //TODO
  // store: sessionStore,
  proxy : true,
}));

/**
 * Log In 
 */
router.post('/', (req, res) => {
  let email = req.body.email;
  let passowrd = req.body.passowrd;
  let query = `SELECT id FROM Users
                  WHERE email= '${email}' AND password='${passowrd}'`;

  con.query(query, (err, result, fields) => {
    if (err || result.length == 0) {
      res.sendStatus(403)
    }else{
      req.session.auth = true;
      req.session.rest_id = result[0].id;
      res.sendStatus(200)
    }
  });
});


/**
 * Create a New User
   */
router.post('/reg', (req, res) => {
  let email = req.body.email;
  let passowrd = req.body.passowrd;
  let sql;

  //inset new user
  sql = `INSERT INTO Users (email, password) 
    VALUES ('${email}' , '${passowrd}');`;
  con.query(sql, (err, result, fields) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.sendStatus(200);
    }
  });
});

/**
 * Log out
 */
router.delete('/', (req, res) => {
  req.session.rest_id = 0;
  req.session.auth = false;

});

router.get('/check', (req, res) => {
  if (req.session.auth) {
    res.json(true);

  } else {
    res.json(false);
  }
});


router.get('/rest_id', (req, res) => {
  if (req.session.auth) {
    res.send(req.session.rest_id.toString());

  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
