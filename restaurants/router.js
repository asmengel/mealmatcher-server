'use strict';
// api/restaurants
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

const { Restaurant } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();
//const jwtAuth = passport.authenticate('jwt', { session: false });
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


// router.get('/:id', jsonParser, (req, res) => {
//   BoardGame
//     .findById(req.params.id)
//     .then(race => {
//       res.json(race.apiRepr());
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'internal server error' });
//     });
// });

router.post('/', jsonParser,  (req, res) => {
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
  
  let { hours, cuisine, price, address, reservation, name, restaurant_URL,restaurant_Image_URL } = req.body;
  
  Restaurant
    .create({ hours, cuisine, price, address, reservation, name, restaurant_URL,restaurant_Image_URL })
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

// router.put('/:boardgameid', jsonParser, jwtAuth, (req, res) => {
//   BoardGame
//     .findByIdAndUpdate(req.params.boardgameid, {
//       $set: {
//         bgg_url:req.body.bgg_url,
//         name: req.body.name,
//         minPlayers: req.body.minPlayers,
//         maxPlayers: req.body.maxPlayers,
//         avgRating: req.body.avgRating,
//         avgTime: req.body.avgTime,
//         imgUrl: req.body.imgUrl
//       }
//     })
//     .then(game => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Internal server error' }));
// });


// router.delete('/:id', jwtAuth, (req, res) => {
//   BoardGame
//     .findByIdAndRemove(req.params.id)
//     .then(game => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Internal server error' }));
// });

module.exports = { router };
