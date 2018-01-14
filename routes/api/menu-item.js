const express = require("express");
const router = express.Router();
const con = require("../../config/mysqlCon.js");
const session = require("express-session");
var rest_id;

function isAuthenticated(req, res, next) {
  if (!req.session.auth) {
    res.sendStatus(403);
  }
  next();
}

router.get(":item_id", (req, res) => {
  let item_id = req.params.item_id;

  let sql = `SELECT FROM Menu_Items 
      WHERE item_id=${item_id}`;

  con.query(sql, function(err, result, fields) {
    if (err) {
      console.log(sql);
      throw err;
    }
  });
});

router.post("/", isAuthenticated, (req, res) => {
  let newItem = req.body;
  newItem.rest_id = req.session.rest_id;
  let sql = new Promise((resolve, reject) => {
    let sql = [
      `UPDATE Menu_Items 
        SET seq = seq + 1
        WHERE rest_id=${newItem.rest_id}
        AND seq>=${newItem.seq}`,

      `INSERT INTO Menu_Items
        VALUES (
          0, ${newItem.rest_id}, ${newItem.seq}, 
          '${newItem.title}', '${newItem.descr}', ${newItem.price}
        )`
    ];

    for (let i = 0; i < sql.length; i++) {
      con.query(sql[i], (err, result, fields) => {
        if (err) {
          console.log(sql[i]);
          throw err;
        }
        if (i === 1) {
          resolve(result.insertId);
        }
      });
    }
  });

  sql.then(
    newId => {
      res.json(newId);
    },
    () => {
      res.sendStatus(400);
    }
  );
});

router.put("/", isAuthenticated, function(req, res) {
  const editItem = req.body;
  let query = `UPDATE Menu_Items 
      SET seq=${editItem.seq}, title='${editItem.title}',
       descr='${editItem.descr}', price=${editItem.price} 
      WHERE (rest_id=${req.session.rest_id} AND item_id=${editItem.item_id})`;

  con.query(query, function(err, result, fields) {
    if (err) {
      console.log(query);
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete("/:id", function(req, res) {
  let id = req.params.id;
  let sql = `DELETE FROM Menu_Items WHERE item_id= ${id}`;

  con.query(sql, (err, result, fields) => {
    if (err) {
      console.log(sql);
      throw err;
    }
  });
  res.sendStatus(200);
});

module.exports = router;
