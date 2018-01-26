const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Restaurant = require("../../db/models/models.js").Restaurant;
const app = express();

/**
 * Log In 
 */
router.post('/', (req, res) => {
  
  let email = req.body.email;
  let password = req.body.password;
  Restaurant.forge({
    email: email,
    password: password
  }).fetch()
    .then(restaurant => {
      req.session.auth = true;
      req.session.rest_id = restaurant.id;
      res.sendStatus(200)
    })
    .catch(err => {
      res.sendStatus(401);
    });
});

/**
 * Create a New User
   */
router.post('/reg', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  Restaurant.forge({
    email: email,
    password: password
  }).save()
    .then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(400);
    });
});

/**
 * Log out
 */
router.delete('/', (req, res) => {
  req.session.rest_id = 0;
  req.session.auth = false;
});

router.get('/check', (req, res) => {
  if (req.session.auth) {
    res.json(true);

  } else {
    res.json(false);
  }
});

router.get('/rest_id', (req, res) => {
  if (req.session.auth) {
    res.send(req.session.rest_id.toString());
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
