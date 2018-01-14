const express = require("express");
const router = express.Router();
const con = require("../../config/mysqlCon.js");
const session = require("express-session");

/**
 * Set resturant name for logged in edit menu
 */
router.get("/", (req, res, next) => {
  let id = req.session.rest_id;
  let sql = `SELECT rest_name FROM Users WHERE id=${id}`;

  con.query(sql, (err, result, fields) => {
    if (err || result[0].rest_name == undefined) {
      res.sendStatus(204);
    } else {
      res.send(result[0].rest_name);
    }
  });
});

/**
 * Get Resurant name by Id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT rest_name FROM Users WHERE id=${req.params.id}`;
  con.query(sql, (err, result, fields) => {
    if (err || result[0].rest_name == undefined) {
      res.sendStatus(204);
    } else {
      res.send(result[0].rest_name);
    }
  });
});

var isLoggedIn = (req, res, next) => {
  // if (!req.session.auth) {
  //   res.sendStatus(403);
  // } else {
  //   next();
  // }
  next();
};

// router.get('/', checkAuth, function (req, res) {

//   let sql = "SELECT rest_name FROM Users " +
//     "WHERE id=" + req.session.rest_id;

//   con.query(sql, function (err, result, fields) {
//     if (err) {
//       console.log(sql);
//       throw err;
//     }
//     res.json(result[0].rest_name)
//   });

// });

// router.post('/', checkAuth, function (req, res) {
//   let rest_name = req.body.rest_name;
//   let query =
//     "UPDATE `Users` " +
//     "SET `rest_name`='" + rest_name + "' " +
//     "WHERE `id`=" + rest_id + ";";

//   con.query(query, function (err, result, fields) {
//     if (err) {
//       console.log(query);
//       throw err;
//     }
//   });
//   res.json();
// });

// router.put('/', checkAuth, function (req, res) {
//   let rest_name = req.body.rest_name;
//   let query =
//     "UPDATE `Users` " +
//     "SET `rest_name`='" + rest_name + "' " +
//     "WHERE `id`=" + rest_id + ";";

//   con.query(query, function (err, result, fields) {
//     if (err) {
//       console.log(query);
//       throw err;
//     }
//   });
//   res.json();
// });

// router.delete('/', checkAuth, function (req, res) {
//   let query =
//     "UPDATE `Users` " +
//     "SET `rest_name`='Resturant New Name' " +
//     "WHERE `id`=" + rest_id + ";";

//   con.query(query, function (err, result, fields) {
//     if (err) {
//       console.log(query);
//       throw err;
//     }
//   });
//   res.json();
// });

module.exports = router;
