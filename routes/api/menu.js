const express = require('express');
const router = express.Router();
const con = require('../../config/mysqlCon.js');

function checkAuth(req, res, next) {
  console.log(new Date() + ":" + req.sessionID)
  
  if(!req.session.auth){
    res.json("no auth for menu");

    }else{
      next()

    }
};


router.get('/', checkAuth, function(req, res){
  
    let sql = "SELECT * FROM Menu_Items " +
                "WHERE rest_id=" + req.session.rest_id + ";";
    
    con.query(sql, function (err, result, fields) {
      if (err){
        console.log(sql);
        throw err;
      }

      res.json(result);
    });

});


router.get('/view-menu/:rest_id', function(req, res){
  let rest_id = req.params.rest_id;
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
