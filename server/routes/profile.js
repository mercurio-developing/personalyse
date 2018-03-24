'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Profile = require("../models/profile");
const mongoose = require('mongoose');


router.route("/")
    .get(function (req, res, next) {
        Profile.find({})
            .exec(function (err, profiles) {
                if (!profiles) {
                    res.status = 401
                    return next(err)
                } else {
                    res.status(200).json(profiles);
                }
            });
        })
        
    // POST "/"
    .post(function (req, res, next) {
            let profileData = req.body.profile
            let id = req.body.profile.artistId
            Profile.find({ artistId: id }, function (err, profile) {
            if (err) console.log(err);  
            console.log(profile)
            if (!profile[0]) {
                console.log('not found')
            Profile.create(profileData, function (err, profile) {
                if (err) {
                    const err = new Error('That profile already exists');
                    err.status = 500;
                    return next(err)
                } else {
                    console.log(profile)
                    res.status(201).location('/').end();
                }
            });
            } else {
                var err = new Error('User not found');
                return res.status(401).json({
                    error: err.message
                });
            }
        });
    });

      

router.route("/db")
    .post(function (req, res, next) {
        console.log(req.body)
        Profile.find({_id:req.body.id})
        .exec(function (err, profiles) {
                if (!profiles) {
                    res.status = 401
                    return next(err)
                } else {
                    res.status(200).json(profiles);
                }
            });
        })
module.exports = router;