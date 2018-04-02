'use strict'

const todosInsts = function (profile,artist) {

const getJSON = require('get-json')
const Inst = require("../models/api/inst/inst");
const Post = require("../models/api/inst/instPost");
const Profile = require("../models/profile");
const mongoose = require('mongoose');

console.log('todo inst on!')

let query = profile
let artistId = artist

getJSON('https://www.instagram.com/' + query + '/?__a=1', function (error, data) {

    let today = new Date().toJSON().slice(0, 10);
       
    let instData = new Inst({
            profileId: artistId,
            createdAt:today,
            totalFollowers: data.graphql.user.edge_followed_by.count,
            todayFollowers: 0,
            todayPosts: '',
            todayPostCount: 0
        })

        instData.todayFollowers = instData.startFollowers - instData.totalFollowers

        let arrayPosts = [];
        let todayPosts = data.graphql.user.edge_owner_to_timeline_media.edges
        
        todayPosts.forEach(function (post) {
        
        let date = new Date(post.node.taken_at_timestamp * 1000);
       
        let postsD = new Post({
                profileId: artistId,
                id: post.id,
                createdAt: date,
                caption: post.node.edge_media_to_caption.edges[0],
                postUrl: 'www.instagram.com/p/' + post.shortcode + '/',//URL of the post
                display_src: post.node.thumbnail_src,
                countComents: post.node.edge_media_to_comment.count,
                countLikes: post.node.edge_liked_by.count 
        })
            arrayPosts.push(postsD)
        });

        let now = today
        let result = arrayPosts.filter(d => {
            var time = new Date(d.createdAt).toJSON().slice(0, 10);
            return (time === now);
        });

        instData.todayPosts = result;
        instData.todayPostCount = result.length

        Profile.find({ artistId: artistId}, function (err, profile) {

        instData.todayFollowers = instData.totalFollowers - profile[0].inst[0].totalFollowers,

        Inst.create(instData, function (err, instD) {

            if (err) console.log(err);

            let dir = profile[0].inst
            if (dir.length === 0) {
                dir.push(instD)
            } else {
                dir.splice(0, dir.length);
                dir.push(instD)
            }

        profile[0].save(function (err, newProfile) {
                   if (err) {
                   console.log(err)
                   }
                   console.log('inst daily done')
                });
            });
        });
    });
}


module.exports = todosInsts
