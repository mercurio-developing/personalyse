const mongoose = require('mongoose');

// User Schema
const spotSchema = mongoose.Schema({
    createdAt: String,
    profileId:String,
    id: String,
    startFollowers: Number,
    totalFollowers: Number,
    todayFollowers: Number,
    startPopularity: Number,
    totalPopularity: Number,
    todayPopularity: Number,
    genres: Array,
    similarArtist:Array
});

var Spot = module.exports = mongoose.model('Spot', spotSchema);