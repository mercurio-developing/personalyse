'use strict'

var todosSpotM = function (profile, artist) {

const mongoose = require('mongoose');

const Spot = require("../models/api/spot/spot");
const Profile = require("../models/profile");

var SpotifyWebApi = require('spotify-web-api-node');

const cfg = require('../routes/api/config');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: cfg.spotify.clientId,
    clientSecret: cfg.spotify.clientSecret,
    redirectUri: cfg.spotify.redirectUri,
});

console.log('Todo spot Monthly!')

let artistId = artist
let query = profile

    spotifyApi.clientCredentialsGrant()
        .then(function (data) {

            let accesstoken = data.body.access_token;
            spotifyApi.setAccessToken(accesstoken);

            spotifyApi.getArtist(query)
                .then(function (data) {
                    
                    let updateGenres = data.body.genres;           

                    spotifyApi.getArtistRelatedArtists(query)
                        .then(function (data) {

                            let updateSimilarArtists = data.body.artists;
  
                            let today = new Date().toJSON().slice(0, 10);          
                            
                            Profile.find({ artistId: artistId, createdAt: today }, function (err, profile) {

                                profile[0].spot[0].genres = updateGenres
                                profile[0].spot[0].similarArtist = updateSimilarArtists

                                profile[0].save(function (err, updateProfile) {
                                    if (err) {
                                        err.status = 400;
                                        console.log(err)
                                    }
                                    console.log('profile monthly done', updateProfile);
                                });
                                Spot.find({ profileId: artistId, createdAt: today }, function (err, spot) {

                                    spot[0].genres = updateGenres
                                    spot[0].similarArtist = updateSimilarArtists

                                    spot[0].save(function (err, updateSpot) {
                                        if (err) {
                                            err.status = 400;
                                            console.log(err)
                                        }
                                        console.log('spot monthly done', updateSpot);
                                    });
                                }); 
                            }); 

                        },function (err) {
                            console.error(err);
                    })
                }, function (err) {
                    console.error(err);
            });
        }), function (err) {
            console.log('Something went wrong when retrieving an access token', err.message);
    }
}

module.exports = todosSpotM
