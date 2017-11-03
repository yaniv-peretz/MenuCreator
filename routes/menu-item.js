const express = require('express');
const router = express.Router();
const con = require('../config/mysqlCon.js');
const session = require('express-session');
var rest_id;

app.use(function(req, res, next){
  if(req.session.auth == true){
    rest_id = req.session.rest_id;
  }
  next()
})

router.get(':item_id', function(req, res){

  let item_id = req.item_id;

  let query = "SELECT FROM Menu_Items " +
              "WHERE rest_id='" + rest_id + "' AND" +
              "item_id='" + item_id + "'";

  con.query(query, function (err, result, fields) {
    if (err) {
      console.log(query);
    throw err;
    }
  });

});

router.post('/', function(req, res){

  let item_id = req.body.item_id;
  let seq     = req.body.seq;
  let title   = req.body.title;
  let descr    = req.body.descr;
  let price   = req.body.price;

  let query = "INSERT INTO Menu_Items " +
                "VALUES ("              +
                  rest_id + ","         +
                  item_id + ","         +
                  seq     + ","         +
                  "'" + title + "',"    +
                  "'" + descr + "',"    +
                  price                 +
                ");";

  con.query(query, function (err, result, fields) {
    if (err) {
      console.log(query);
    throw err;

    }else{
    res.json("menu-item-post-ok");
    }

  });

});


router.put('/', function(req, res){
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
      res.json("menu-item-put-ok");

    }
  });

});


router.delete('/', function(req, res){

  let item_id = req.body.item_id;
  let query = "DELETE FROM Menu_Items "         +
              "WHERE "                          +
                "rest_id="     + rest_id + " "  +
                "AND item_id=" + item_id + ";";


  con.query(query, function (err, result, fields) {
    if (err) {
      console.log(query);
      throw err;

    }else{
      console.log(query);
      res.json("menu-item-delete-ok");

    }

  });

});


module.exports = router;
