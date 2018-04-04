'use strict';
const mongoose = require('mongoose')

const todoFace = require('./todo/todoFace.js');
const todoTwit = require('./todo/todoTwit.js');
const todoInst = require('./todo/todoInst.js');
const todoYou = require('./todo/todoYou.js');
const todoSpot = require('./todo/todoSpot.js');
const todoSpotM = require('./todo/todoSpotM.js');

const todoVideo = require('./todo/todoVideo.js');
const todoPlaylist = require('./todo/todoPlaylist.js');

const Profile = require("./models/profile");


console.log('running from todo!')
let profilesArray;
Profile.find({})
    .exec(function (err, profiles) {
        if (!profiles) {
            console.log('no profiles')
        } else {
            profilesArray = profiles;
        }
        profilesArray.forEach(function (profile) {
            console.log('profiles')
            todoFace(profile.urls[0]);
            todoInst(profile.urls[1], profile.artistId);
            todoTwit(profile.urls[2], profile.artistId);
            todoYou(profile.urls[3], profile.artistId)
            todoVideo(profile.urls[3], profile.artistId)
            todoSpot(profile.urls[4], profile.artistId)
            // todoSpotM(profile.urls[4], profile.artistId);
        });
    });

