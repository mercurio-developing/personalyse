'use strict'

const express = require("express");
const router = express.Router();
const getJSON = require('get-json')
const Inst = require("../../models/api/inst/inst");
const instPost = require("../../models/api/inst/instPost");
const Profile = require("../../models/profile");
const mongoose = require('mongoose');

const cfg = require('./config.js'); // api config

router.post('/', function (req, res) {
    let user = req.body.user
    getJSON('https://www.instagram.com/'+user+'/?__a=1', function (error, response) {
        res.send(response);
    })
})

router.post('/save', function (req, res) {
    let artistId = req.body.artistId
    let user = req.body.id
   
    getJSON('https://www.instagram.com/' + user + '/?__a=1', function (error, data) {
    let today = new Date().toJSON().slice(0, 10);
    console.log(data)
    let instData = new Inst({
        _id: mongoose.Types.ObjectId(),
        profileId: user,
        createdAt: today,
        startFollowers: data.graphql.user.edge_followed_by.count,
        totalFollowers: data.graphql.user.edge_followed_by.count,
        todayFollowers: '',
        totalPosts: data.graphql.user.edge_owner_to_timeline_media.count,
        todayPosts: '',
        todayPostCount: 0
    })

    instData.todayFollowers = instData.startFollowers - instData.totalFollowers

    let todayPosts = data.graphql.user.edge_owner_to_timeline_media.edges;
    let arrayPosts = [];
    
    todayPosts.forEach(function (post) {
        let date = new Date(post.taken_at_timestamp * 1000);
        let postsD = new instPost({
            profileId: artistId,
            id: post.node.id,
            createdAt: date,
            caption: post.node.edge_media_to_caption.edges[0],
            postUrl: 'www.instagram.com/p/' + post.shortcode +'/',//URL of the post
            display_src: post.node.thumbnail_src,
            countComents: post.node.edge_media_to_comment.count,
            countLikes: post.node.edge_liked_by.count 
        })
        arrayPosts.push(postsD)
    });

    instData.todayPosts = arrayPosts;
    instData.todayPostCount = arrayPosts.length

    Inst.create(instData, function (err, instD) {
        if (err) console.log(err);
        // Find the `user` that owns the category
        Profile.find({ artistId: artistId }, function (err, profile) {
            if (err) console.log(err);

            let dir = profile[0].inst
            dir.push(instD)
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
})

module.exports = router


