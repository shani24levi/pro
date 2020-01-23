const express= require('express');
const mongoose = require('mongoose');
const Post =require('../models/Posts');
const User =require('../models/Users');
const Apartment =require('../models/Apartments');




class PostsController {

    //for testing:
    static async verifyUser(req,res){
        return res.json({posts: {title: 'hello' , desciption: 'wish it works'} });
    }
    ///-----------///

    static async createPost(req,res){
        try{
            const {error} =  creatPostValidation(req.body);
            if(error)
                return res.status(400).send(error.details[0].message);

            //create a new post 
            const today=new Date()
            let newPost = new Post({ 
                text: req.body.text,
                first_name: req.body.first_name, //will come from redax
                avatar: req.body.avatar,
                user: req.user._id, //in the token user 
                //??//apartment: req.apartment._id, //apartment token...???
                created: today
            });

            const savePost = newPost.save();
            if(savePost){
   
            /*
            *Update collections in DB
            *
            * -put post in array posts[] user id (modole profile OR user)
            * 
            * -put post in array posts[] apartment id (modle apartment)
            * 
            * 
            *  
            * need to do thet.......done in profile in delete user..........
            */



                //Save post
                return res.status(200).send({
                    message: 'Post created sucssfly ',
                    post: savePost
                })
            } else return res.status(404).send({message: 'Save faild'});

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
