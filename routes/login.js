const express = require('express');
const con = require('../config/mysqlCon.js');
const router = express.Router();
const session = require('express-session');

app.use(session({
  secret: 'a',
  resave: false,
  saveUninitialized: true,
}))


router.post('/',approveUserPassword, function(req, res){

  if(req.session.auth){
    let url = '/menu.html';
    res.redirect(url);

  }else{
    req.session.auth = false;
    let url = '/index.html';
    res.redirect(url);

  }
});


function approveUserPassword(req, res, next) {

  let email = req.body.email;
  let psw = req.body.psw;
  let query = "SELECT id FROM Users " +
              "WHERE email= '" + email + "' AND " +
              "password='" + psw + "'";

  con.query(query, function (err, result, fields) {
    if (err) throw err;

    if(result.length > 0){
      req.session.auth = true;
      req.session.rest_id = result[0].id;

    }else{
      req.session.auth = false;
    }

    next();
  });
}


router.post('/reg', function(req, res){
  let email = req.body.email;
  let psw = req.body.psw;
  let sql;

  sql = "INSERT INTO Users (email, password) " +
          "VALUES ('"+email+"', '"+psw+"');";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });

  sql = "INSERT INTO Menu_Items "       +
        "(rest_id, item_id, seq) "  +
          "SELECT id, 0, 0  "                 +
          "FROM Users "                 +
          "WHERE email='"+email+"' AND password='"+psw+"';";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });


  let query = "SELECT id FROM Users " +
              "WHERE email= '" + email + "' AND " +
              "password='" + psw + "'";
  con.query(query, function (err, result, fields) {
    if (err) throw err;

    req.session.auth = true;
    req.session.rest_id = result[0].id;

    let url = '/menu.html';
    res.redirect(url);
  });
});

    // console.log(query);
    //             //   ,
    //             //   "INSERT INTO Menu_Items (rest_id, item_id=1, seq=1, title='new title', descr='description', price=10) " +
    //             //     "SELECT id  "               +
    //             //     "FROM Users "                                                        +
    //             //     "WHERE email='"+email+"' AND password='"+psw+"';"
    //             //   ,
    //             //   "SELECT id FROM Users " +
    //             //   "WHERE email= '" + email + "' AND " +
    //             //   "password='" + psw + "'"
    //             // ];
    //



router.get('/check', function(req, res){
  if(req.session.auth){
    res.json(true);

  }else{
    res.json(false);
  }
});


module.exports = router;
