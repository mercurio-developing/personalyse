'use strict'

var todosVideos = function (profile,artist) {

const { google } = require('googleapis');
const mongoose = require('mongoose');
const You = require('../models/api/you/you');
const youVideo = require('../models/api/you/youVideo');
const statsVideo = require('../models/api/you/statsVideo')
const Profile = require("../models/profile");
const cfg = require('../routes/api/config');

const youtube = google.youtube({
    version: cfg.youtube.version,
    auth: cfg.youtube.auth
});

console.log('todo videos statistics')

let artistId = artist;
let query = profile;

youVideo.find({profileId:artistId}, function (err, videosD) {

            videosD.forEach(function (video) {
            let id = video.id
            youtube.videos.list({
                part: 'snippet,contentDetails,statistics',
                id: id,
            }, (err, data) => {
                if (err) {
                    throw err;
                }       
            
            let today = new Date().toJSON().slice(0, 10);

            let updateTotalViewCount = parseInt(data.data.items[0].statistics.viewCount);
            let updateTotalLikeCount = parseInt(data.data.items[0].statistics.likeCount);
            let updateTotalDislikeCount = parseInt(data.data.items[0].statistics.dislikeCount);
            let updateTotalFavoriteCount = parseInt(data.data.items[0].statistics.favoriteCount);
            let updateTotalCommentCount = parseInt(data.data.items[0].statistics.commentCount);

            let newTodayViewCount = updateTotalViewCount - video.statistics.totalViewCount 
            let newTodayLikeCount = updateTotalLikeCount - video.statistics.totalLikeCount 
            let newTodayDislikeCount = updateTotalDislikeCount - video.statistics.totalDislikeCount
            let newTodayFavoriteCount = updateTotalFavoriteCount - video.statistics.totalFavoriteCount 
            let newTodayCommentCount = updateTotalCommentCount - video.statistics.totalCommentCount 

            let statsD = new statsVideo({
                videoId: id,
                createdAt: today,
                startViewCount: video.statistics.startViewCount,
                startLikeCount: video.statistics.startLikeCount,
                startDislikeCount: video.statistics.startDislikeCount,
                startFavoriteCount: video.statistics.startFavoriteCount,
                startCommentCount: video.statistics.startCommentCount,
                totalViewCount: updateTotalViewCount,
                totalLikeCount: updateTotalLikeCount,
                totalDislikeCount: updateTotalDislikeCount,
                totalFavoriteCount: updateTotalFavoriteCount,
                totalCommentCount: updateTotalCommentCount,
                todayViewCount: newTodayViewCount,
                todayLikeCount: newTodayLikeCount,
                todayDislikeCount: newTodayDislikeCount,
                todayFavoriteCount: newTodayFavoriteCount,
                todayCommentCount: newTodayCommentCount,
            })

            statsVideo.create(statsD, function (err, newStats) {
                if (err) console.log(err);
            })

            youVideo.findOneAndUpdate({ "_id": video._id}, 
            { "$set": { 
                "statistics.todayViewCount": newTodayViewCount,
                "statistics.todayLikeCount": newTodayLikeCount,
                "statistics.todayDislikeCount": newTodayDislikeCount,
                "statistics.todayFavoriteCount": newTodayCommentCount,
                "statistics.todayCommentCount": newTodayCommentCount
                } 
            }).exec(function (err, newVideo) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('statistics daily done')
                    }
                });
            });
        });
    });
}

module.exports = todosVideos
