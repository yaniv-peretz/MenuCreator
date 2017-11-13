const express = require('express');
const router = express.Router();
const con = require('../../config/mysqlCon.js');
const session = require('express-session');
var rest_id;

function checkAuth(req, res, next) {
  if (!req.session.auth) {
    res.json("no auth for menu-item");
  }
  rest_id = req.session.rest_id;
  next()
};

router.get(':item_id', function(req, res){

  let item_id = req.params.item_id;

  let sql = "SELECT FROM Menu_Items " +
              "WHERE rest_id='" + rest_id + "' AND" +
              "item_id='" + item_id + "'";

  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(sql);
    throw err;
    }
  });

});


router.post('/', checkAuth, function(req, res){

  let item_id = req.body.item_id;
  let seq     = req.body.seq;
  let title   = req.body.title;
  let descr    = req.body.descr;
  let price   = req.body.price;

  let sql = [
    "UPDATE Menu_Items "              +
    "set seq = seq + 1 "              +
    "WHERE "                          +
      "rest_id="     + rest_id + " "  +     
      "AND seq >= " + seq 
    ,

    "INSERT INTO Menu_Items " +
      "VALUES ("              +
        rest_id + ","         +
        item_id + ","         +
        seq     + ","         +
        "'" + title + "',"    +
        "'" + descr + "',"    +
        price                 +
        ");"
  ]
  
  for (let i = 0; i < sql.length; i++) {
    con.query(sql[i], function (err, result, fields) {
      if (err) {
        console.log(sql[i]);
        throw err;
      }
    });
  }
  res.json("");

});


router.put('/', checkAuth, function(req, res){
  let item_id = req.body.item_id;
  let seq     = req.body.seq;
  let title   = req.body.title;
  let descr    = req.body.descr;
  let price   = req.body.price;

  let query = "UPDATE Menu_Items "          +
              "SET "                        +
                "seq="    + seq   + ", "    +
                "title='" + title + "', "   +
                "descr='" + descr + "', "   +
                "price="  + price + " "     +
              "WHERE ("                     +
                "rest_id=" + rest_id + " "  +
                "AND item_id=" + item_id    +
              ");";

  con.query(query, function (err, result, fields) {
    if (err) {
      console.log(query);
      throw err;

    }else{
      res.json("");

    }
  });

});


router.delete('/', checkAuth, function(req, res){

  let item_id = req.body.item_id;
  let seq = req.body.seq;
  let sql = [
    "DELETE FROM Menu_Items "         +
    "WHERE "                          +
      "rest_id="     + rest_id + " "  +
      "AND item_id=" + item_id + ";"

    ,

    "UPDATE Menu_Items "              +
    "SET item_id  = item_id -1 "      +
    "WHERE "                          +
      "rest_id="     + rest_id + " "  +     
      "AND item_id > "+ item_id

    ,

    "UPDATE Menu_Items "              +
    "SET seq  = seq -1 "              +
    "WHERE "                          +
      "rest_id="     + rest_id + " "  +     
      "AND seq > " + seq 

  ]
                
  for (let i = 0; i < sql.length; i++) {
    con.query(sql[i], function (err, result, fields) {
      if (err) {
        console.log(sql[i]);
        throw err;
      }
    });  
  }

  res.json("menu-item-delete-ok");

});


module.exports = router;
