'use strict';
const express = require('express');

const { PORT, DATABASE_URL } = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
//const {Restaurant} = require('./restaurants);

const restaurantArray =
  [
    {
      name: 'Suffolk Arms',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Upstate',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Seafood, Wine Bars, Beer Bar',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Suffolk Arms',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Best Breakfast',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Later Lunch',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Dope Dinner',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Suffolk Arms',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Yum House',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Suffolk Arms2',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },{
      name: 'Suffolk Arms3',
      hours: '5:00 pm - 2:00 am',
      cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
      price: 20,
      address: '269 Houston St, New York, NY 10002',
      reservation: false,
      restaurant_URL: 'http://www.suffolkarms.com/',
      restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
    },
  ];


function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(DATABASE_URL, { useMongoClient: true }).catch(err => {
    console.error('Mongoose failed to connect');
    console.error(err);
  });
}

let server;

function runServer(url = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

return runServer()
  .then(() => {
    const arrayOfPromises = restaurantArray.map((restaurant, idx) => {
      return Restaurant.create(restaurantArray[idx]);
    });
    return Promise.all(arrayOfPromises);
  })
  .then((restaurants) => {
    // console.log(restaurants);
    return restaurants.map(restaurant => restaurant._id);
  })
  .then(() => {
    const arrayOfRestaurantPromises = restaurantArray.map((restaurant, idx) => {
      return Restaurant.insertMany(restaurantArray[idx]);
    });
    return Promise.all(arrayOfQuestionPromises);
  })
  .catch(err => {
    console.log(err);
  });