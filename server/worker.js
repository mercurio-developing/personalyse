module.exports = {
    todo: () => {
        console.log('running todo!')
        let profilesArray;
        Profile.find({})
            .exec(function (err, profiles) {
                if (!profiles) {
                    console.log('no profiles')
                } else {
                    profilesArray = profiles;
                }
                profilesArray.forEach(function (profile) {
                    console.log('profiles')
                    todoFace(profile.urls[0]);
                    todoInst(profile.urls[1], profile.artistId);
                    todoTwit(profile.urls[2], profile.artistId);
                    todoYou(profile.urls[3], profile.artistId)
                    todoVideo(profile.urls[3], profile.artistId)
                    todoSpot(profile.urls[4], profile.artistId)
                });
            });
    };
};