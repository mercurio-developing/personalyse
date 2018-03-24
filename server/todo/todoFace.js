'use strict'

const todosFaces = function(profile) {

const mongoose = require('mongoose');
    
const FB = require('fb')
const Face = require("../models/api/face/face");
const Post = require("../models/api/face/facePost");
const Profile = require("../models/profile");

const cfg = require('../routes/api/config.js'); // api config

FB.options({ version: cfg.facebook.version });
FB.extend({appId: cfg.facebook.appId, appSecret: cfg.facebook.appSecret});
FB.setAccessToken(cfg.facebook.token);

let id = profile

console.log('todo facebook!')

FB.api(id, { fields: 'id,name,picture.type(large),fan_count,engagement,feed,posts' }, function (data) {
        
    let today = new Date().toJSON().slice(0, 10);

    let faceData = new Face({
        profileId: id,
        createdAt: today,
        totalLikes: data.fan_count,
        todayLikes: 0,
        todayPosts: '',
        totalPostsToday:''
    })

    faceData.todayLikes = faceData.startLikes - faceData.totalLikes,

    FB.api('/' + id + '/feed', { limit: '100', fields: 'id,attachments,message,permalink_url,created_time, comments,posts.summary(true),reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(LOVE).limit(0).summary(1).as(love),reactions.type(HAHA).limit(0).summary(1).as(haha),reactions.type(WOW).limit(0).summary(1).as(wow),reactions.type(SAD).limit(0).summary(1).as(sad),reactions.type(ANGRY).limit(0).summary(1).as(angry), shares' }, function (posts) {

    let todayPosts = posts.data

    let arrayPosts = [];

    todayPosts.forEach(function (post) {

        let postsD = new Post({
            profileId: id,
            id: post.id,
            attachments: post.attachments,
            createdAt: post.created_time,
            message: post.message,
            comments: post.comments.data,
            countComents: post.comments.data.length,
            permalink: post.permalink_url,
            reactions: {
                like: post.like.summary.total_count,
                love: post.love.summary.total_count,
                haha: post.haha.summary.total_count,
                wow: post.wow.summary.total_count,
                sad: post.sad.summary.total_count,
                angry: post.angry.summary.total_count,
                shares: post.shares.count
                }
            })
           arrayPosts.push(postsD)
        });

        let now = today
        let result = arrayPosts.filter(d => {
            var time = new Date(d.createdAt).toJSON().slice(0, 10);
            return (time === now);
        });

        faceData.totalPostsToday = result.length;

        faceData.todayPosts = result;

        Profile.find({ artistId: data.id }, function (err, profile) {

        faceData.todayLikes = faceData.totalLikes - profile[0].face[0].totalLikes,

        Face.create(faceData, function (err, faceD) {

            if (err) console.error(err);

            let dir = profile[0].face
            if (dir.length === 0) {
                dir.push(faceD)
            } else {
                dir.splice(0, dir.length);
                dir.push(faceD)
               }

            profile[0].save(function (err, newProfile) {
                    if (err) {
                      err.status = 400;
                      console.error(err)
                    }
                     console.log('face daily done')
                    });
                });
            });
        });
    });
}


module.exports = todosFaces
