'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

router.route("/register")
  .get(function (req, res, next) {
    User.find({})
      .exec(function (err, users) {
        if (!users) {
          res.status = 401
          return next(err)
        } else {
          res.status(200).json(users);
        }
      });
  })

  // POST "/"
  .post(function (req, res, next) {
    if (req.body.email &&
      req.body.username &&
      req.body.password) {
      // create object 
      var userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      console.log(userData)
     // use schema's `create` method to insert document into Mongo
      User.create(userData, function (err, user) {
        console.log(user)
        if (err) {
          const err = new Error('That user already exists');
          err.status = 500;
          return next(err)
        } else {
          res.status(201).location('/').end();
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });




router.post("/login", function (req, res, next) {
  // create object 	  		 
  console.log(req.body)
  if (req.body.email &&
    req.body.password) {
    var email = req.body.email;
    var password = req.body.password
    User.authenticate(email, password, function (err, user) {
      if (err) {
        var err = new Error('User not found');
        return res.status(401).json({
          error: err.message
        });
      } else if (!user) {
        var err = new Error('Password incorrect');
        return res.status(401).json({
          error: err.message
        });
      }
      var token = user.generateJwt()
      return res.status(200).json({
        token: token,
        username: user.username,
        email: user.email,
        _id: user._id
      })
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;