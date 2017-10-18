'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantSchema = mongoose.Schema({
  hours: { type: String, required: true }, // ask if time is special input
  cuisine: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  reservation: { type: Boolean, required: true },
  name: { type: String, required: true },
  restaurant_URL: { type: String, required: true, unique: true },
  restaurant_Image_URL: { type: String, required: true, unique: true }

});

restaurantSchema.methods.apiRepr = function () {
  return {
    hours: this.hours,
    cuisine: this.cuisine,
    price: this.price,
    address: this.address,
    reservation: this.reservation,
    name: this.name,
    restaurant_URL: this.restaurant_URL,
    restaurant_Image_URL: this.restaurant_Image_URL

  };
};

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant };
