const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const faceSchema = new Schema({
    profileId: String,
    createdAt: String,
    startLikes: Number,
    totalLikes: Number,
    todayLikes: Number,
    totalPosts: Number,
    todayPosts: Array,
    totalPostsToday: Number
});

var Face = module.exports = mongoose.model('Face', faceSchema);