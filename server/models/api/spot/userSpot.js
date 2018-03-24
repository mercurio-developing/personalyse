const mongoose = require('mongoose');

// playlist Schema
const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const userSpotSchema = new Schema({
    userId: String,
    createdAt:String,
    playlist:Object
});

const userSpot = mongoose.model('userSpot', userSpotSchema);
module.exports = userSpot;