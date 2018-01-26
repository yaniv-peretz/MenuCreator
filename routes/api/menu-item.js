const express = require("express");
const router = express.Router();
const MenuItem = require("../../db/models/models.js").MenuItem;
const isAuthenticated = require("../util/checkAuth.js");
const con = require("../../config/mysqlCon.js");

/**
 * Add new Item to the menu
 */
router.post("/", [isAuthenticated], (req, res) => {
  let newItem = req.body;
  newItem.restaurant_id = req.session.rest_id;

  const menuItem = new MenuItem(newItem);
  menuItem.addItem()
    .then(newId => {
      res.json(newId);
    }).catch(() => {
      res.sendStatus(500);
    })
});

router.put("/", [isAuthenticated], function (req, res) {
  let editItem = req.body;
  MenuItem.forge({
    restaurant_id: editItem.restaurant_id,
    id: editItem.id,
    title: editItem.title,
    description: editItem.description,
    price: editItem.price,
    sequence: editItem.sequence,
    updated_at: new Date()
  }).save()
    .then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
});

router.delete("/:id", [isAuthenticated], (req, res) => {
  const restaurant_id = req.session.rest_id;
  const id = req.params.id;
  const newItem = {
    id : id,
    restaurant_id: restaurant_id
  }
  const menuItem = new MenuItem(newItem);
  menuItem.removeItem()
    .then(newId => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
    })
});

module.exports = router;
