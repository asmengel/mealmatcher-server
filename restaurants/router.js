'use strict';
// api/restaurants
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { Restaurant } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(jsonParser);

router.get('/', jsonParser, (req, res) => {
  Restaurant
    .find()
    .then(restaurants => {
      res.json(restaurants);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Search failed' });
    });
});

router.get('/:id', jsonParser, (req, res) => {
  Restaurant
    .findById(req.params.id)
    .then(restaurant => {
      return res.status(200).json(restaurant.apiRepr());
    })
    .catch(err => {
      res.status(500).json({ error: 'something went horribly wrong' });
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['hours', 'cuisine', 'price', 'address', 'reservation', 'name', 'restaurant_URL', 'restaurant_Image_URL'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  let { hours, cuisine, price, address, reservation, name, restaurant_URL, restaurant_Image_URL } = req.body;

  Restaurant
    .create({ hours, cuisine, price, address, reservation, name, restaurant_URL, restaurant_Image_URL })
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      if (err.code === 11000) {
        return res.status(409).json({ code: 409, message: 'Duplicate Restaurant' });
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });

});

router.put('/:restaurantid', jsonParser, (req, res) => {
  Restaurant
    .findByIdAndUpdate(req.params.restaurantid, {
      $set: {
        hours: req.body.hours,
        cuisine: req.body.cuisine,
        price: req.body.price,
        address: req.body.address,
        reservation: req.body.reservation,
        name: req.body.name,
        restaurant_URL: req.body.restaurant_URL,
        restaurant_Image_URL: req.body.restaurant_Image_URL

      }
    })
    .then(restaurant => res.status(204).end())
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' })
    });
});


router.delete('/:id', (req, res) => {
  Restaurant
    .findByIdAndRemove(req.params.id)
    .then(restaurant => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };
