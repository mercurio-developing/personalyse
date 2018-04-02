'use strict'

const todosSpots = function (profile, artist) {
    
const mongoose = require('mongoose');

const Spot = require("../models/api/spot/spot");
const Profile = require("../models/profile");
    
const SpotifyWebApi = require('spotify-web-api-node');

const cfg = require('../routes/api/config');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: cfg.spotify.clientId,
    clientSecret: cfg.spotify.clientSecret,
    redirectUri: cfg.spotify.redirectUri,
});
    
    console.log('Todo spot!')

        let artistId = artist
        let query = profile

        spotifyApi.clientCredentialsGrant()
            .then(function (data) {
            
            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);

        spotifyApi.getArtist(query)
            .then(function (data) {
            let today = new Date().toJSON().slice(0, 10);
            let spotData = new Spot({
                createdAt: today,
                id: data.body.id,
                totalFollowers: data.body.followers.total,
                todayFollowers: 0,
                totalPopularity: data.body.popularity,
                todayPopularity: 0,
                genres: data.body.genres,
                similarArtists: ''
            })


        spotifyApi.getArtistRelatedArtists(query)
            .then(function (data) {

            spotData.similarArtist.push(data.body.artists)

        Profile.find({ artistId: artistId }, function (err, profile) {
            spotData.todayFollowers = spotData.totalFollowers - profile[0].spot[0].totalFollowers;
            spotData.todayPopularity = spotData.totalPopularity - profile[0].spot[0].totalPopularity;    

        Spot.create(spotData, function (err, spotD) {
                if (err) console.log(err);

                let dir = profile[0].spot
                console.log(dir.length)
                if (dir.length === 0) {
                    dir.push(spotD)
                } else {
                    dir.splice(0, dir.length);
                    dir.push(spotD)
                }
                profile[0].save(function (err, newProfile) {
                    if (err) {
                        err.status = 400;
                        console.log(err)
                    }
                        console.log('spot daily done')
                    });
                });
            });
            },
            function (err) {
                    console.error(err);
            })
        }, function (err) {
                    done(err);
        });
    }), function (err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    }
}

module.exports = todosSpots
