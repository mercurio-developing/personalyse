'use strict'

const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const mongoose = require('mongoose');
const You = require('../../models/api/you/you');
const youVideo = require('../../models/api/you/youVideo');
const statsVideo = require('../../models/api/you/statsVideo')
const Profile = require("../../models/profile");

const cfg = require('./config.js'); // api config

const youtube = google.youtube({
    version: cfg.youtube.version,
    auth: cfg.youtube.auth
});

router.post("/", function (req, res,next) {
    console.log(req.body)
    let id = req.body.id
    Profile.findById({_id:id})
        .exec(function (err, profile) {
            if (!profile) {
                res.status = 401
                return next(err)
            } else {
                console.log(profile.you)
                res.send(profile)
            }
        });
});

router.post("/save", function (req, res) {
    let artistId = req.body.artistId;
    let query = req.body.id;
    console.log(req.body,'from youtube /save')
        // let artistId = '9189674485';
        // let query = 'edsheeran';

    youtube.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: query
    }, (err, data) => {
        if (err) {
            throw err;
        }

        let today = new Date().toJSON().slice(0, 10);
          
        let youData = new You({
            profileId: artistId,
            channelId: data.data.items[0].id,
            createdAt: today,
            startViews: parseInt(data.data.items[0].statistics.viewCount),
            totalViews: parseInt(data.data.items[0].statistics.viewCount),
            todayViews: 0,
            startSubscribers: parseInt(data.data.items[0].statistics.subscriberCount),
            totalSubscribers: parseInt(data.data.items[0].statistics.subscriberCount),
            todaySubscribers: 0,
            totalVideos: parseInt(data.data.items[0].statistics.videoCount),
            todayVideos: '',
            todayVideosCount: ''
        })

        youData.todayLikes = youData.startSubscribers - youData.totalSubscribers;
        youData.todayViews = youData.startViews - youData.totalViews;

        let playlistId = data.data.items[0].contentDetails.relatedPlaylists.uploads

        youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            maxResults: 50
        }, (err, data) => {
            if (err) {
                throw err;
            }
            let videos = data.data.items
            let youVideos = []

            videos.forEach(function (post) {
                let videoId = post.contentDetails.videoId
                youtube.videos.list({
                    part: 'snippet,contentDetails,statistics',
                    id: videoId,
                }, (err, data) => {
                    if (err) {
                        throw err;
                    }
                let videoD = new youVideo({

                    profileId: artistId,
                    id: post.contentDetails.videoId,
                    createdAt: post.snippet.publishedAt,
                    channelId: post.snippet.channelId,
                    videoUrl: 'https://www.youtube.com/watch?v=' + post.contentDetails.videoId +'',
                    title: post.snippet.title,
                    description: post.snippet.description,
                    statistics: '',
                    })


                    let statsD = new statsVideo({
                        videoId: videoId,
                        createdAt:today,
                        startViewCount: parseInt(data.data.items[0].statistics.viewCount),
                        startLikeCount: parseInt(data.data.items[0].statistics.likeCount),
                        startDislikeCount: parseInt(data.data.items[0].statistics.dislikeCount),
                        startFavoriteCount: parseInt(data.data.items[0].statistics.favoriteCount),
                        startCommentCount: parseInt(data.data.items[0].statistics.commentCount),
                        totalViewCount: parseInt(data.data.items[0].statistics.viewCount),
                        totalLikeCount: parseInt(data.data.items[0].statistics.likeCount),
                        totalDislikeCount: parseInt(data.data.items[0].statistics.dislikeCount),
                        totalFavoriteCount: parseInt(data.data.items[0].statistics.favoriteCount),
                        totalCommentCount: parseInt(data.data.items[0].statistics.commentCount),
                        todayViewCount: 0,
                        todayLikeCount: 0,
                        todayDislikeCount: 0,
                        todayFavoriteCount: 0,
                        todayCommentCount: 0,
                    })

                    statsD.todayViewCount = statsD.startViewCount - statsD.totalViewCount;
                    statsD.todayLikeCount = statsD.startLikeCount - statsD.totalLikeCount;
                    statsD.todayDislikeCount = statsD.startDislikeCount - statsD.totalDislikeCount;
                    statsD.todayFavoriteCount = statsD.startFavoriteCount - statsD.totalFavoriteCount;
                    statsD.todayCommentCount = statsD.startCommentCount - statsD.totalCommentCount;
                   
                    youVideos.push(videoD);
                    videoD.statistics = statsD;
                    youData.todayVideosCount = youVideos.length;
                    youData.todayVideos = youVideos;


                    youVideo.create(videoD, function(err,newVideo){
                        if (err) console.log(err);
                    })

                    statsVideo.create(statsD, function (err, newStats) {
                        if (err) console.log(err);
                    })


        if (youData.todayVideos.length === videos.length) {
                        You.create(youData, function (err, youD) {
                            if (err) console.log(err);
                            Profile.find({ artistId: artistId }, function (err, profile) {
                                if (err) console.log(err);
                                let dir = profile[0].you
                                console.log(dir.length)
                                if (dir.length === 0) {
                                    dir.push(youD)
                                } else {
                                    dir.splice(0, dir.length);
                                    dir.push(youD)
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
                    }
                })
            });
        });
    });
});

router.post("/videos", function (req, res) {
    let query = req.body.id
    youtube.channels.list({
    part: 'snippet,contentDetails,statistics',
    forUsername: req.body.id
     }, (err, data) => {
        if (err) {
            throw err;
        }
        let playlistId = data.data.items[0].contentDetails.relatedPlaylists.uploads
        youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            maxResults :20
            }, (err, data) => {
                if (err) {
                    throw err;
                }
                res.send(data.data.items)
            });     
        });
    });

    

module.exports = router