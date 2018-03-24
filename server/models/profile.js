const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

    // profile Schema
const ProfileSchema = new Schema({

    artistId: {
        type: String,
    },
    name: {
        type: String,
    },
    src: {
        type: String,
    },
    urls: {
        type: Array,
    },
    createdAt:Date,
    face: [{
        type: Schema.Types.Mixed,
        ref: 'Face'
    }],
    you: [{
            type: Schema.Types.Mixed,
            ref: 'You'
         }],
    inst: [{
        type: Schema.Types.Mixed,
        ref: 'Inst'
    }],
    twit:[{
            type: Schema.Types.Mixed,
            ref: 'Twit'
        }],
    spot:[{
            type: Schema.Types.Mixed,
            ref: 'Spot'
        }]
    });

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;