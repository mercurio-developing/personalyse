const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const facePostSchema = new Schema({
    profileId: String,
    id:String,
    createdAt: Date,
    postUrl: String, //URL of the post
    message:String,
    permalink:String,
    attachments: Object,//Media of the post(video link, image URL)
    comments:Array,
    countComents:Number,
    reactions:{
        type:Schema.Types.Mixed
    }
});


var facePost = module.exports = mongoose.model('facePost', facePostSchema);