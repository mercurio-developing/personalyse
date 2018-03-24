const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const statsVideoSchema = new Schema({
    videoId:String,
    createdAt:String,
    startViewCount: Number,
    startLikeCount: Number,
    startDislikeCount:Number,
    startFavoriteCount:Number,
    startCommentCount:Number,
    totalViewCount: Number,
    totalLikeCount: Number,
    totalDislikeCount:Number,
    totalFavoriteCount:Number,
    totalCommentCount:Number,
    todayViewCount: Number,
    todayLikeCount: Number,
    todayDislikeCount: Number,
    todayFavoriteCount: Number,
    todayCommentCount: Number,
});


var statsVideo = module.exports = mongoose.model('statsVideo', statsVideoSchema);