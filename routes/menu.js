const express = require('express');
const router = express.Router();
const con = require('../config/mysqlCon.js');

app.use(function(req, res, next) {
  console.log(req.session.id);
  console.log(req.session);
  next();
})

router.get('/', function(req, res){
  if(req.session.auth == true){

    let rest_id = req.session.rest_id;
    let query = "SELECT * FROM Menu_Items " +
    "WHERE rest_id=" + rest_id + ";";

    con.query(query, function (err, result, fields) {
      if (err){
        console.log(query);
        throw err;
      }

      res.json(result);
    });
  }else{
    res.json("no auth");
  }

});


router.get('/v', function(req, res){
  let rest_id = req.query.rest_id;
  let query = "SELECT * FROM Menu_Items " +
  "WHERE rest_id=" + rest_id + ";";

  con.query(query, function (err, result, fields) {
    if (err){
      console.log(query);
      throw err;
    }

    res.json(result);
  });
});

module.exports = router;
