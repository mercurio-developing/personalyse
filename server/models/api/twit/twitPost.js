const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const twitPostSchema = new Schema({
    profileId: String,
    id:String,
    createdAt: Date,
    message:String,
    entities: Object,//links, user mentions
    retweetCount:Number,
    favoriteCount: Number
});


var twitPost = module.exports = mongoose.model('twitPost', twitPostSchema);