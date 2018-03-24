const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const youVideoSchema = new Schema({
    profileId: String,
    id:String,
    createdAt: Date,
    channelId:String,
    videoUrl:String,
    title:String,
    description:String,
    statistics: Object,//links, user mentions
});


var youVideo = module.exports = mongoose.model('youVideo', youVideoSchema);