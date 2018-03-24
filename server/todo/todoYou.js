'use strict'

var todosYous = function (profile, artist) {

    const { google } = require('googleapis');
    const mongoose = require('mongoose');
    var You = require('../models/api/you/you');
    var youVideo = require('../models/api/you/youVideo');
    var Profile = require("../models/profile");

    var cfg = require('../routes/api/config.js'); // token of tweeter api

    const youtube = google.youtube({
        version: cfg.youtube.version,
        auth: cfg.youtube.auth
    });

    console.log('todo youtube');

    let artistId = artist;
    let query = profile;

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
            totalViews: parseInt(data.data.items[0].statistics.viewCount),
            todayViews: 0,
            totalSubscribers: parseInt( data.data.items[0].statistics.subscriberCount),
            todaySubscribers: 0,
            totalVideos: parseInt(data.data.items[0].statistics.videoCount),
            todayVideos: 0,
            todayVideosCount: 0
        });

        let playlistId = data.data.items[0].contentDetails.relatedPlaylists.uploads

        youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            maxResults: 50
        }, (err, data) => {
            if (err) {
                throw err;
            }
            let videos = data.data.items;
            let youVideos = [];

            videos.forEach(function (post) {
                let idVideo = post.contentDetails.videoId
                youtube.videos.list({
                    part: 'snippet,contentDetails,statistics',
                    id: idVideo,
                }, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    let videoD = new youVideo({

                        profileId: artistId,
                        id: post.contentDetails.videoId,
                        createdAt: post.snippet.publishedAt,
                        channelId: post.snippet.channelId,
                        videoUrl: 'https://www.youtube.com/watch?v=' + post.contentDetails.videoId + '',
                        title: post.snippet.title,
                        description: post.snippet.description,
                        statistics: {
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
                        }
                    })

                    videoD.todayViewCount = videoD.startViewCount - videoD.totalViewCount;
                    videoD.todayLikeCount = videoD.startLikeCount - videoD.totalLikeCount;
                    videoD.todayDislikeCount = videoD.startDislikeCount - videoD.totalDislikeCount;
                    videoD.todayFavoriteCount = videoD.startFavoriteCount - videoD.totalFavoriteCount;
                    videoD.todayCommentCount = videoD.startCommentCount - videoD.totalCommentCount;

                    youVideos.push(videoD);

                    if (videos.length === youVideos.length) {

                        let now = today;
                        let result = youVideos.filter(d => {    
                            var time = new Date(d.createdAt).toJSON().slice(0, 10);
                            return (time === now);
                        });

                        youData.todayVideos = result.length;
                        youData.todayVideos = result;

                        result.forEach(function (video) {
                            youVideo.create(video, function (err, newVideo) {
                                if (err) console.log(err);
                            });
                        });
                        
                        Profile.find({ artistId: videoD.profileId }, function (err, profile) {
                            youData.todayLikes = youData.totalSubscribers - profile[0].you[0].totalSubscribers;
                            youData.todayViews = youData.totalViews - profile[0].you[0].totalViews;
                      
                        You.create(youData, function (err, youD) {
                                if (err) console.log(err);
                                let dir = profile[0].you
                                if (dir.length === 0) {
                                    dir.push(youD)
                                } else {
                                    dir.splice(0, dir.length);
                                    dir.push(youD)
                                }
                                profile[0].save(function (err, newProfile) {
                                    if (err) {
                                        err.status = 400;
                                        console.log(err)
                                    }
                                    console.log('youtube daily done')
                                });
                            });
                        });
                    }
                })
            });
        });
    });
}

module.exports = todosYous
