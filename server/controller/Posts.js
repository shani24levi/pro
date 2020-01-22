const express= require('express');
const mongoose = require('mongoose');
const joi = require('joi');
var cors = require('cors');
const Post =require('../models/Posts');
//const User =require('../models/Users');
const {creatPostValidation}  = require('../valdition');

//const Pusher = require('pusher');
//var Pusher = new Pusher({
//    appId: '934131',
//    key: '1b6ba9c2b29991926eb2',
//    secret: 'f5ee07c7a8614ec99511',
//    cluster: 'eu',
//    encrypted: true
//});


class PostsController {
    static async verifyUser(req,res){
        return res.json({posts: {title: 'hello' , desciption: 'wish it works'} });
    }


    static async createPost(req,res){
        try{
            //validat the data
            const {error} =  creatPostValidation(req.body);
            if(error)
                return res.status(400).send(error.details[0].message);

            //chacking if all form is filed
            if (!req.body.title || !req.body.messag || !req.body.subtitle || !req.body.star) {
                return res.status(404).send('Missing Information try again');
            };

            //create a new post using pusher(real time)
            const today=new Date()
            let postData = new Post({ 
                title: req.body.title,
                subtitle: req.body.subtitle,
                messag: req.body.messag,
                star: req.body.star, 
                created: today
            });

            new Post(postData).save().then(post => {
                pusher.trigger('messag-poll', 'my-post', {
                  star: parseInt(post.star),
                  messag: post.messag
            });
            
            res.status(200).json({ success: true, message: 'Post seccsesfuly' });
            res.send('Post seccsesfuly');
        });
            //const savePost = await postData.save();
            //res.status(200).send(savePost);
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        } 
    }

    static async findPostByID(req,res){
    }

    static async findByApartmentID(req,res){
    }

    static async updatePost(req,res){
    }

    static async updatePost(req,res){
    }
    

}


module.exports =PostsController;
