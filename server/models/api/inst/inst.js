const mongoose = require('mongoose');

// User Schema
const instSchema = mongoose.Schema({
    profileId: String,
    createdAt: String,
    startFollowers: Number,
    totalFollowers: Number,
    todayFollowers: Number,
    totalPosts: Number,
    todayPosts: Array,
    todayPostCount: Number
});

var Inst = module.exports = mongoose.model('Inst', instSchema);