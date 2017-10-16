'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantsSchema  = mongoose.Schema({
    hours:{ type: String, required: true}, // ask if time is special input
    cuisine:{ type: String, required: true},
    price: {type: Number, required: true},
    address:{type: String, required: true},
    reservation: {type: Boolean, required: true},
    title: {type: String, required: true},
    Restaurants_URL:{type: String, required: true, unique: true},
    Restaurants_Image_URL:{type: String, required: true, unique: true}

  });
  
  boardGameSchema.methods.apiRepr = function () {
    return { 
      avgRating:this.avgRating,
      bgg_url:this.bgg_url,
      imgUrl:this.imgUrl,
      name: this.name,
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
      avgTime: this.avgTime,
      checked: this.checked
    };
  };
  
  const BoardGame = mongoose.models.BoardGame || mongoose.model('BoardGame', boardGameSchema);
  
  module.exports = { BoardGame };
 