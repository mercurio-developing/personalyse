const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const instPostSchema = new Schema({
    profileId: String,
    id: String,
    createdAt: Date,
    postUrl: String, //URL of the post
    caption: String,
    display_src: String,
    countComents: Number,
    countLikes:Number
});


var instPost = module.exports = mongoose.model('instPost', instPostSchema);