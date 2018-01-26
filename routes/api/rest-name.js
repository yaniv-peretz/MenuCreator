const express = require("express");
const router = express.Router();
const Restaurant = require("../../db/models/models.js").Restaurant;
const checkAuth = require("../util/checkAuth.js");

function getRestaurantName(id, req, res) {
  Restaurant
    .where({
      id: id
    }).fetch({
      require: true,
      columns: 'name'
    }).then(restaurant => {
      res.send(restaurant.attributes.name)
    }).catch(err => {
      res.sendStatus(204)
      console.error(err);
    });
}

/** ########################################
 *    Edit mode - loggedin required
 *   #######################################  */

/**
 * Set resturant name for logged in edit menu
 */
router.get("/", [checkAuth], (req, res) => {
  const id = req.session.rest_id;
  getRestaurantName(id, req, res)
});

router.put('/', [checkAuth], (req, res) => {
  let id = req.session.rest_id;
  let name = req.body.rest_name;

  new Restaurant({ 'id': id })
    .save({ 'name': name }, { patch: true })
    .then(() => {
      res.sendStatus(200);
    }).catch(() => {
      console.error(err);
      res.sendStatus(204);
    });
});

/** ########################################
 *    view mode - not neccerry loggedin   
 *   #######################################  */

/**
 * Get Resurant name by Id.
 * this method is intended for view mode (where the is no looged in resturant)
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  getRestaurantName(id, req, res)
});

module.exports = router;
