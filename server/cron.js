'use strict';

const mongoose = require('mongoose')
const CronJob  = require('cron').CronJob;

const todoFace = require('./todo/todoFace.js');
const todoTwit = require('./todo/todoTwit.js');
const todoInst = require('./todo/todoInst.js');
const todoYou  = require('./todo/todoYou.js');
const todoSpot = require('./todo/todoSpot.js');
const todoSpotM = require('./todo/todoSpotM.js');

const todoVideo = require('./todo/todoVideo.js');
const todoPlaylist = require('./todo/todoPlaylist.js');

const Profile = require("./models/profile");

const cron = require('cron');

const todo = () =>{
    let profilesArray;
    Profile.find({})
        .exec(function (err, profiles) {
            if (!profiles) {
                console.log('no profiles')
            } else {
                profilesArray = profiles;
            }
    profilesArray.forEach(function (profile) {
        todoFace(profile.urls[0]);
        todoInst(profile.urls[1], profile.artistId);
        todoTwit(profile.urls[2],profile.artistId);
        todoYou(profile.urls[3],profile.artistId)
        todoVideo(profile.urls[3], profile.artistId)
        todoSpot(profile.urls[4], profile.artistId)
        // todoSpotM(profile.urls[4], profile.artistId);
        }); 
    });   
}

let daily = new cron.CronJob({
    cronTime: '00 00 00 * * *',  
        onTick: function () {
        console.log('running ')
        todo();
    },
    start: true,
    timeZone: 'Europe/London'
});

console.log('daily status', daily.running); // daily status before

daily.start(); // daily started

console.log('daily status', daily.running); // daily status after

module.exports = cron