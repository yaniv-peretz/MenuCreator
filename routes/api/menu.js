const express = require("express");
const router = express.Router();
const Restaurant = require("../../db/models/models.js").Restaurant;
const checkAuth = require("../util/checkAuth.js");

router.get("/", [checkAuth], (req, res) => {
  const rest_id = req.session.rest_id;
  Restaurant.where('id', rest_id).fetch({ withRelated: ['items'] })
    .then(restaurant => {
      result = restaurant.related('items').toJSON();
      res.json(result);
    }).catch(function (err) {
      console.error(err);
    });
});

router.get("/view/:rest_id", (req, res) => {
  const rest_id = req.params.rest_id;
  Restaurant.where('id', rest_id).fetch({ withRelated: ['items'] })
    .then(restaurant => {
      result = restaurant.related('items').toJSON();
      res.json(result);
    }).catch(err => {
      console.error(err);
    });
});

module.exports = router;
