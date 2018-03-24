'use strict'

const express = require("express");
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const Profile = require("../../models/profile");
const Playlist = require("../../models/api/spot/playlist");
const Spot = require("../../models/api/spot/spot");
const userSpot = require("../../models/api/spot/userSpot");
const mongoose = require('mongoose');

const cfg = require('./config.js'); // api config
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: cfg.spotify.clientId,
    clientSecret: cfg.spotify.clientSecret,
    redirectUri: cfg.spotify.redirectUri,
});

router.post('/playlist', function (req, res) {
    let user = req.body.artist
    let id = req.body.id
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);
            spotifyApi.getUserPlaylists(user)
                .then(function (data) {
                    spotifyApi.getPlaylistTracks(user, id, { 'offset': 1, 'limit': 5, 'fields': 'items' })
                        .then(function (data) {
                            res.send(data.body)
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                }, function (err) {
                    console.log('Something went wrong when retrieving an access token', err.message);
                });
            });
        });


router.post('/playlist/save', function (req, res) {
    // let user = 'fg22wnhqbsytbwxnh2zfx5f5u'
    // let id = '56yc5K05YXY0tG5kLx2UHi'
    let user = req.body.user;
    let id = req.body.id;
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);

            spotifyApi.getPlaylist(user, id)
                .then(function (data) {

                    let today = new Date().toJSON().slice(0, 10);

                    let listData = new Playlist({
                        userId: user,
                        id: id,
                        createdAt: today,
                        startFollowers: data.body.followers.total,
                        totalFollowers: data.body.followers.total,
                        todayFollowers: 0,
                        owner: data.body.owner,
                        uri: data.body.uri,
                        tracks: data.body.tracks.items,
                        tracksCount: data.body.tracks.items.length
                    })

                    listData.todayFollowers = listData.totalFollowers - listData.startFollowers;

                    Playlist.create(listData, function (err, listD) {
                        if (err) console.log(err);

                        let userData = new userSpot({
                            userId: user,
                            createdAt: today,
                            playlist: listD
                        })

                        userSpot.create( userData , function (err, newUser) {
                            res.send(newUser)
                        });

                    }), function (err) {
                        console.log('Something went wrong!', err);
                };
            }), function (err) {
                console.log('Something went wrong when retrieving an access token', err.message);
        };
    });
});


router.post('/save', function (req, res) {
    let artistId = req.body.artistId
    let query = req.body.id
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);

            spotifyApi.getArtist(query)
                .then(function (data) {
                    let today = new Date().toJSON().slice(0, 10);
                    let spotData = new Spot({
                        _id: mongoose.Types.ObjectId(),
                        createdAt:today,
                        profileId: artistId,
                        id: query,
                        startFollowers:data.body.followers.total,
                        totalFollowers: data.body.followers.total,
                        todayFollowers: 0,
                        startPopularity:data.body.popularity,
                        totalPopularity: data.body.popularity,
                        todayPopularity: 0,
                        genres:data.body.genres,
                        similarArtists:''
                    })

                    spotData.todayFollowers = spotData.totalFollowers - spotData.startFollowers;
                    spotData.todayPopularity = spotData.totalPopularity - spotData.startPopularity;

                    spotifyApi.getArtistRelatedArtists(query)
                        .then(function (data) {
                    spotData.similarArtist = data.body.artists;

                    Spot.create(spotData, function (err, spotD) {
                        if (err) console.log(err);
                        // Find the `user` that owns the category
                        Profile.find({ artistId: artistId }, function (err, profile) {
                            if (err) console.log(err);
                            let dir = profile[0].spot
                            dir.push(spotD)
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

                }, 
                function (err) {
                    console.error(err);
                })
                }, function (err) {
                    console.error(err);
                });                   
                }), function (err) {
                    console.log('Something went wrong when retrieving an access token', err.message);
                }
            });

module.exports = router