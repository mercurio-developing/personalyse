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

var port = process.env.PORT || 8000;
const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static('dist'));

app.use('/user',userRoutes);
app.use('/user/profiles', profileRoutes);
app.use('/api/facebook', facebookRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/twitter',twitterRoutes);
app.use('/api/youtube',youtubeRoutes);
app.use('/api/spotify', spotifyRoutes);

require('./db');
require('./cron')

app.listen(port, function () {
    console.log("App is running on port " + port);
});

