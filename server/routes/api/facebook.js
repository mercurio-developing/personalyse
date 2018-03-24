'use strict'

const express = require("express");
const router = express.Router();
const FB = require('fb')
const Face = require("../../models/api/face/face");
const facePost = require("../../models/api/face/facePost");
const Profile = require("../../models/profile");
const mongoose = require('mongoose');

const cfg = require('./config.js'); // api config

FB.options({ version: cfg.facebook.version });
FB.extend({appId: cfg.facebook.appId, appSecret: cfg.facebook.appSecret});
FB.setAccessToken(cfg.facebook.token);

router.get('/', function (req, res,next) {
    let id = req.body.id
    Profile.find({ artistId:id}).exec(function (err,face) {
        if(!face){
            res.status = 401
            return next(err)
        }else{
            res.status(200).json(face);
        }
    });    
})

router.post('/profile', function (req, res) {
    let id = req.body.id;
    FB.api(id, { fields: 'id,name,picture.type(large),fan_count,engagement,feed,posts' }, function (data) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(data)
        res.send(data)
    });
})




router.post('/save', function (req, res, next) {
    let id = req.body.id
    // let id = 'madonna'

    FB.api(id, { fields: 'id,name,picture.type(large),fan_count,engagement,feed,posts' }, function (data) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        // res.send(data)
        let today = new Date().toJSON().slice(0, 10);
        let faceData = new Face({
            profileId: req.body.id,
            createdAt: today,
            startLikes: data.fan_count,
            totalLikes: data.fan_count,
            todayLikes: 0,
            totalPosts: 0,
            todayPosts: ''
        })

        faceData.todayLikes = faceData.startLikes - faceData.totalLikes,

            FB.api('/' + id + '/feed', { limit: '100', fields: 'id,attachments,message,permalink_url,created_time, comments,posts.summary(true),reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(LOVE).limit(0).summary(1).as(love),reactions.type(HAHA).limit(0).summary(1).as(haha),reactions.type(WOW).limit(0).summary(1).as(wow),reactions.type(SAD).limit(0).summary(1).as(sad),reactions.type(ANGRY).limit(0).summary(1).as(angry), shares' }, function (posts) {
                if (!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }

                faceData.totalPosts = posts.data.length;
                let todayPosts = posts.data;
                let arrayPosts = [];
                todayPosts.forEach(function (post) {
                    let postsD = new facePost({
                        profileId: req.body.id,
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

                faceData.todayPosts = arrayPosts;

                Face.create(faceData, function (err, faceD) {
                    if (err) console.log(err);

                Profile.find({ artistId: data.id }, function (err, profile) {
                        if (err) console.log(err);
                        let dir = profile[0].face
                        console.log(dir.length)
                        if (dir.length === 0) {
                            dir.push(faceD)
                        } else {
                            console.log('delete')
                            dir.splice(0, dir.length);
                            dir.push(faceD)
                        }


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
});



module.exports = router
