const express = require('express');
const con = require('../../config/mysqlCon.js');
const router = express.Router();
const session = require('express-session');

app.use(session({
  secret: 'a',
  resave: false,
  saveUninitialized: true,
}))


router.post('/',approveUserPassword, function(req, res){

  var refer = req.rawHeaders[15]
  var port;

  if(req.session.auth){
    if(refer.includes('3000')){
      port = 3000;

    }else{
      port = 8080;

    }

    let url = 'http://localhost:'+port+'/edit-menu';
    res.redirect(url);

  }else{
    req.session.auth = false;
    let url = '/';
    res.redirect(url);

  }
});


function approveUserPassword(req, res, next) {

  let email = req.body.email;
  let psw = req.body.psw;
  let query = "SELECT id FROM Users "             +
              "WHERE email= '" + email + "' AND " +
              "password='" + psw + "'"            ;

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


router.post('/out', function(req, res){
  let url = '/';    
  res.redirect(url);
  req.session.auth = false;

  });


router.post('/reg', function(req, res){
  let email = req.body.email;
  let psw = req.body.psw;
  let sql;

  //inset new user
  sql = "INSERT INTO Users (email, password) " +
          "VALUES ('"+email+"', '"+psw+"');";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });

  //inset first menu item
  sql = "INSERT INTO Menu_Items "                           +
        "(rest_id, item_id, seq) "                          +
          "SELECT id, 0, 0  "                               +
          "FROM Users "                                     +
          "WHERE email='"+email+"' AND password='"+psw+"';" ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });

  //and set session data
  let query = "SELECT id FROM Users "             +
              "WHERE email= '" + email + "' AND " +
              "password='" + psw + "'"            ;
  con.query(query, function (err, result, fields) {
    if (err) throw err;

    req.session.auth = true;
    req.session.rest_id = result[0].id;

    let url = '/edit-menu';
    res.redirect(url);
  });
});


router.get('/check', function(req, res){
  if(req.session.auth){
    res.json(true);

  }else{
    res.json(false);
  }
});


router.get('/rest_id', function(req, res){

  if(req.session.auth){
    res.json(req.session.rest_id);

  }else{
    res.json(0);
  }

});

module.exports = router;
