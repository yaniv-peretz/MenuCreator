const express = require("express");
const router = express.Router();
const con = require("../../config/mysqlCon.js");

function checkAuth(req, res, next) {
  if (!req.session.auth) {
    res.json("no auth for menu");
  } else {
    next();
  }
}

router.get("/", checkAuth, (req, res) => {
  let sql = `SELECT * FROM Menu_Items WHERE rest_id=${req.session.rest_id}`;
  con.query(sql, (err, result, fields) => {
    if (err) {
      console.log(sql);
      throw err;
    }

    res.json(result);
  });
});

router.get("/view/:rest_id", (req, res) => {
  const rest_id = req.params.rest_id;
  const sql = `SELECT * FROM Menu_Items WHERE rest_id=${rest_id}`;

  con.query(sql, (err, result, fields) => {
    if (err) {
      console.error(sql);
      throw err;
    }

    res.json(result);
  });
});

module.exports = router;
