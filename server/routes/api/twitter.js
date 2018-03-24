'use strict'

const express = require('express');//express module
const router = express.Router(); //router is the function express router
const Twitter = require('twit'); // tweeter module
const config = require('./config.js'); // token of tweeter api
const Twit = require("../../models/api/twit/twit");
const twitPost = require("../../models/api/twit/twitPost");
const Profile = require("../../models/profile");
const mongoose = require('mongoose');

const cfg = require('./config.js'); // api config

var T = new Twitter(cfg.twitter); // I create a new variable with keys in the module config

router.get('/', function (req, res) { //when the route is in "/" the program calls for different data
    // let artist = req.body.id;
    let artist = 'madonna'
    const fiveLastFriends = T.get('users/show', { screen_name: artist }, function (err, data, response) {
        res.send(data)
    });
});


router.post('/save', function (req, res) { //when the route is in "/" the program calls for different data
    let artistId = req.body.artistId
    let query = req.body.id
    // let artistId = '9189674485'
    // let query = 'edsheeran'
    const twit = T.get('users/show', { screen_name: query }, function (err, data, response) {
    });
    const tweets = T.get('statuses/user_timeline', { count: 100, screen_name: query}, function (err, data, response) {
    });

    const arrayOfPromises = [twit,tweets]; // I create the promise, then  I wait for all data responses 
    Promise.all(arrayOfPromises).then(function (arrayOfResults) {	
        
        let userData = arrayOfResults[0].data
        let tweetsData = arrayOfResults[1].data
        
        let today = new Date().toJSON().slice(0, 10);
        
        let twitData = new Twit({
            _id: mongoose.Types.ObjectId(),
            profileId: artistId,
            createdAt: today,
            startFollowers: userData.followers_count,
            totalFollowers: userData.followers_count,
            todayFollowers: '',
            totalPosts: userData.statuses_count,
            totalPosts: '',
            todayPosts: '',
            todayPostsCount: ''
        })

        twitData.todayFollowers = twitData.startFollowers - twitData.totalFollowers,

        twitData.totalPosts = tweetsData.length;
        let todayPosts = tweetsData;
        let arrayPosts = [];
        todayPosts.forEach(function (post) {
            let postsD = new twitPost({
                profileId: artistId,
                id: post.id_str,
                createdAt: post.created_at,
                message: post.text,
                entities:post.entities,
                retweetCount: post.retweet_count,
                favoriteCount: post.favorite_count
            })
            arrayPosts.push(postsD)
        });

        twitData.todayPosts = arrayPosts;
        twitData.todayPostsCount = arrayPosts.length

        Twit.create(twitData, function (err, twitD) {
            if (err) console.log(err);
            // Find the `user` that owns the category
            Profile.find({ artistId: artistId }, function (err, profile) {
                if (err) console.log(err);
                
                let dir = profile[0].twit
                dir.push(twitD)
                profile[0].save(function (err, newProfile) {
                    if (err) {
                        err.status = 400;
                        return next(err)
                    }
                    res.status = 201;
                    res.send(newProfile)
                });
            });
        });
    });
});


module.exports = router;//I export router module    