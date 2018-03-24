const mongoose = require('mongoose');

// User Schema
const youSchema = mongoose.Schema({
    profileId: String,
    channelId:String,
    createdAt: String,
    startViews: Number,
    totalViews: Number,
    todayViews: Number,
    startSubscribers: Number,
    totalSubscribers: Number,
    todaySubscribers: Number,
    totalVideos: Number,
    todayVideos: Array,
    todayVideosCount: Number
});

var You = module.exports = mongoose.model('You', youSchema);