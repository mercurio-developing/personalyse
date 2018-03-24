const mongoose = require('mongoose');

// playlist Schema
const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const PlaylistSchema = new Schema({
    userId:String,
    id: String,
    createdAt: String,
    startFollowers: Number,
    totalFollowers: Number,
    todayFollowers: Number,
    snapshotId:String,
    owner:Object,
    uri: String,
    tracks: Array,
    tracksCount:Number
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;