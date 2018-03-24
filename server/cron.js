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
        todoTwit(profile.urls[2],profile.artistId);
        todoInst(profile.urls[1],profile.artistId);
        todoYou(profile.urls[3],profile.artistId)
        todoSpot(profile.urls[4], profile.artistId)
        todoVideo(profile.urls[3], profile.artistId)
        todoSpotM(profile.urls[4], profile.artistId);
        }); 
    });   
}

var job1 = new cron.CronJob({
    cronTime: '* * * * *',
    onTick: function () {
        console.log('job 1 ticked');

    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

var job2 = new cron.CronJob({
    cronTime: '* * * * *',
    onTick: function () {
        todo();
        console.log('job 2 ticked');
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

console.log('job1 status', job1.running); // job1 status undefined
console.log('job2 status', job2.running); // job2 status undefined

job1.start(); // job 1 started
job2.start(); // job 1 started

console.log('job1 status', job1.running); // job1 status true
console.log('job2 status', job2.running); // job2 status undefined


module.exports = cron