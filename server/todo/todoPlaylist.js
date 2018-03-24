'use strict'

const todosPlaylists = function (user, id) {

const mongoose = require('mongoose');

const SpotifyWebApi = require('spotify-web-api-node');
const Profile = require("../models/profile");
const Playlist = require("../models/api/spot/playlist");
const Spot = require("../models/api/spot/spot");
const userSpot = require("../models/api/spot/userSpot");

const cfg = require('../routes/api/config/config.js')
// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: cfg.spotify.clientId,
    clientSecret: cfg.spotify.clientSecret,
    redirectUri: cfg.spotify.redirectUri,
});

    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);
           
            spotifyApi.getPlaylist(user, id)
                .then(function (data) {
                
                let today = new Date().toJSON().slice(0, 10);
   
                    let listData = new Playlist({
                        userId:user,
                        id: id,
                        createdAt: today,
                        startFollowers: data.body.followers.total,
                        totalFollowers: data.body.followers.total,
                        todayFollowers: 0,
                        owner: data.body.owner,
                        uri: data.body.uri,
                        snapshotId: data.body.snapshot_id,
                        tracks: data.body.tracks.items,
                        tracksCount:data.body.tracks.items.length
                    })


                    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON().slice(0, 10);

                    Playlist.find({ createdAt: yesterday }, function (err, playlist) {
                        console.log(playlist[0].totalFollowers)


                        listData.todayFollowers = listData.totalFollowers - playlist[0].totalFollowers,
                        Playlist.create(listData, function (err, listD) {
                            if (err) console.log(err);

                            console.log('userSpot daily done')
                    });
                }), function (err) {
                    console.log('Something went wrong!', err);
              };
            }), function (err) {
                console.log('Something went wrong when retrieving an access token', err.message);
        };
    });
}

module.exports = todosPlaylists
