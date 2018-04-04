'use strict'

var todosTwits = function (profile, artistId) {

const Twitter = require('twit'); // tweeter module
const cfg = require('../routes/api/config');
const Twit = require("../models/api/twit/twit");
const twitPost = require("../models/api/twit/twitPost");
const Profile = require("../models/profile");
const mongoose = require('mongoose');

const T = new Twitter(cfg.twitter); // I create a new variable with keys in the module config

console.log('to do twit')
        
let id = artistId
let query = profile
       
const twit = T.get('users/show', { screen_name: query }, function (err, data, response) {
        });
        
const tweets = T.get('statuses/user_timeline', { count: 100, screen_name: query }, function (err, data, response) {
        });
        
const arrayOfPromises = [twit, tweets]; // I create the promise, then  I wait for all data responses 
       
Promise.all(arrayOfPromises).then(function (arrayOfResults) {

let userData = arrayOfResults[0].data
let tweetsData = arrayOfResults[1].data

let today = new Date().toJSON().slice(0, 10);

let twitData = new Twit({
        profileId: id,
        createdAt: today,
        totalFollowers: userData.followers_count,
        todayFollowers: 0,
        totalPosts: userData.statuses_count,
        todayPosts: '',
        todayPostsCount:''
    })

    twitData.todayFollowers = twitData.startFollowers - twitData.totalFollowers

    let todayPosts = tweetsData;
    let arrayPosts = [];
       
        todayPosts.forEach(function (post) {
            let postsD = new twitPost({
                profileId: query,
                id: post.id_str,
                createdAt: post.created_at,
                message: post.text,
                entities: post.entities,
                retweetCount: post.retweet_count,
                favoriteCount: post.favorite_count
            })
            arrayPosts.push(postsD)
        });


        let now = today
        let result = arrayPosts.filter(d => {
            var time = new Date(d.createdAt).toJSON().slice(0, 10);
            return (time === now);
        });

                twitData.todayPostCount = result.length;
                twitData.todayPosts = result;

                Profile.find({ artistId: id }, function (err, profile) {

                twitData.todayFollowers = twitData.totalFollowers - profile[0].twit[0].totalFollowers,

                Twit.create(twitData, function (err, twitD) {

                if (err) console.log(err);

                let dir = profile[0].twit
                console.log(dir.length)
                if (dir.length === 0) {
                    dir.push(twitD)
                } else {
                    dir.splice(0, dir.length);
                    dir.push(twitD)
                }

                profile[0].save(function (err, newProfile) {
                    if (err) {
                        err.status = 400;
                        console.log(err)
                    }
                    console.log('twit daily done')
                });
            });
        });
    });
}


module.exports = todosTwits
