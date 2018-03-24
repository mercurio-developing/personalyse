const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secret = require('../config/database')

// User Schema
const Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
      email:{
        type: String,
        required: true
      },
      username:{
        type: String,
        required: true
      },
      password:{
        type: String,
        required: true
      }
  })

// authenticate input against database documents
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err);
        } else if (!user) {
          const err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        console.log(user)
        console.log(user.password, password)
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            console.log(result)
            return callback(null, user);
          } else {
            console.log(result)
            return callback(err);
          }
        })
      });
  };

UserSchema.methods.generateJwt = function () {
  return jwt.sign({
     email: this.email
  }, secret.key, { expiresIn: 18000 })
};

// hash password before saving to database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
