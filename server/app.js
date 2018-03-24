'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const cors = require('cors');

const facebookRoutes  = require('./routes/api/facebook');
const instagramRoutes = require('./routes/api/instagram');
const twitterRoutes   = require('./routes/api/twitter');
const youtubeRoutes   = require('./routes/api/youtube');
const spotifyRoutes   = require('./routes/api/spotify');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');

const port = process.env.PORT || 3000;
const app = express();

const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
app.use(cors())



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static('client'));

app.use('/user',userRoutes);
app.use('/user/profiles', profileRoutes);
app.use('/api/facebook', facebookRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/twitter',twitterRoutes);
app.use('/api/youtube',youtubeRoutes);
app.use('/api/spotify', spotifyRoutes);

require('./db');
// require('./cron')
app.listen(port, function () {
    console.log("Express Started on Port 3000");
});

