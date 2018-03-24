const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const twitSchema = new Schema({
    profileId: String,
    createdAt: String,
    startFollowers: Number,
    totalFollowers: Number,
    todayFollowers: Number,
    totalPosts: Number,
    todayPosts: Array,
    todayPostCount:Number
});

var Twit = module.exports = mongoose.model('Twit', twitSchema);

