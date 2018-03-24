
'use strict';

const mongoose = require('mongoose');
const config = require('./config/database')
const User = require('./models/user');
const Profile = require('./models/profile');
const Face = require('./models/api/face/face');
const facePosts = require('./models/api/face/facePost');
const Inst = require('./models/api/inst/inst');
const instPost = require('./models/api/inst/instPost');
const Twit = require('./models/api/twit/twit');
const twitPost = require('./models/api/twit/twitPost');
const You = require('./models/api/you/you');
const youVideo = require('./models/api/you/youVideo');
const statsVideo = require('./models/api/you/statsVideo')
const Spot = require('./models/api/spot/spot');
const Playlist = require('./models/api/spot/playlist');
const data = require('./data/data.js');

mongoose.Promise = require('bluebird');

mongoose.connect(config.database)

//Get the default connection
var db = mongoose.connection;
const Schema = mongoose.Schema,
    ObjectID = require('mongodb').ObjectID;



db.on("error", function (err) {
    console.log('error')
    }).catch(function (err) {
        console.error(err)
    });

db.once("open", function () {


    console.log('running')
    async function dropDatabase() {
        console.log('Removing User collection')
        await User.remove()
        await Playlist.remove()
        await Profile.remove()
        await Face.remove()
        await Twit.remove()
        await Inst.remove()
        await You.remove()
        await youVideo.remove()
        await statsVideo.remove()
        await Spot.remove()


        console.log('Success!')
    }

    async function seedUsers() {
        console.log('Seeding data..')
        try {
            await User.insertMany(data.user)
            await Playlist.insertMany(data.playlist)
            await Profile.insertMany(data.profile)
            console.log('Success!')
        } catch (error) {
            console.log('Error:'+ error)
        }
    }
    async function doBoth(){
    // await seedUsers();
    // await dropDatabase();
    }

    doBoth();

    }).catch (function (err) {
        console.error(err)
    });


module.exports = db;
