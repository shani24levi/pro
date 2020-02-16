const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Validation
const validatePostInput = require('../validation/post');


async function getPosts(req, res) {
    try {
        Post.find()
        .sort({ date: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));    
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function getPostsById(req, res) {
    try {
        const allPosts = await Post.findById(req.params.postId).populate('aprtment user', 'first_name last_name email city address price'); 
        if(!allPosts)
            return res.status(404).send({message: 'Post not found' })
        
        return res.status(200).send({message: 'Post found' , Posts: allPosts });
        
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function createPost(req, res) {
    try {
        const { errors, isValid } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
          // If any errors, send 400 with errors object
          return res.status(400).json(errors);
        }
    
        const newPost = new Post({
          text: req.body.text,
          name: req.body.first_name,
          avatar: req.body.avatar,
          user: req.user.id,
          aprtment: req.body.aprtment, 
        });
    
        newPost.save().then(post => res.status(200).json(post));   
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function deletePost(req, res) {
    try {
       //Chack if the current user is the owner of the post
       const userPost = await User.findOne({ _id: req.user._id });
       if (!userPost)
           return res.status(404).send({message: 'User not found' })
       
       const post = await Post.findById(req.params.postId)
       if (!post)
           return res.status(404).send({message: 'Post not found'});
       if (String(post.user) !== String(req.user._id)) //make it to string only to make sure it same type
               return res.status(401).send({message: 'Not allowd. This user is not the owner of the post' });
       else
           //Delete
           //first  remove this post from user module post[]array
           var postUser = await User.findOne({_id: req.user._id})
           if (!postUser)
               return res.status(404).send({message: 'User not found'});
           else{
               //remove user id from posts array
               postUser.posts.unshift({ user: req.user._id });
               await postUser.save();
           }

           //Now Delet
           post.remove().then(()=> res.status(200).send({message: 'post remove sucssfuly '}) );    
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function likePost(req, res) {
    try {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
              .then(post => {
                if (
                  post.likes.filter(like => like.user.toString() === req.user.id)
                    .length > 0
                ) {
                  return res
                    .status(400)
                    .json({ alreadyliked: 'User already liked this post' });
                }
      
                // Add user id to likes array
                post.likes.unshift({ user: req.user.id });
      
                post.save().then(post => res.json(post));
              })
              .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function unlikePost(req, res) {
    try {
        const userPost = await User.findOne({ _id: req.user._id });
        if (!userPost)
            return res.status(404).send({message: 'User not found' })
        
        //Chake this user allrady liked the post
        const post = await Post.findById(req.params.postId)
        if (!post)
            return res.status(404).send({message: 'Post not found'});
        if (post.likes.filter( like => String(like.user) == String(req.user._id) ).length  === 0 ) //equlle ziro meen the id user is not in the liks array
                return res.status(400).send({message: 'You have not yet liked this post' });    
        else
            //Get the Remove index
            var removeIndex = post.likes //if i put const or let its not compile!!!
                .map(item=> String(item.user))
                .indexOf(req.user._id);

            //Splice out of the array
            post.likes.splice(removeIndex,1);    

            //Save the changes
            const saveIt = post.save();
            if (saveIt)
                return res.status(200).send({message: 'Unlike post succfuly' });  
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function commentPost (req, res) {
    try {
         //Chack if post exists
         const post = await Post.findById(req.params.postId);
         if (!post)
             return res.status(404).send({message: 'Post not found' })
         
         //Creat a comment to thet post
         const neComment ={
             text: req.body.text,
             name: req.body.name,
             avatar: req.body.avatar,
             user: req.user._id
         }

         //Add to comment array 
         post.comments.unshift(neComment);
         //Save in DB
         const saveIt = post.save().then(t => t.populate('user', 'first_name last_name email').execPopulate()) ;
         if (!saveIt)
             return res.status(401).send({message: 'Something went wrong with data' });    
         
         return res.status(200).send({message: 'Comment added to the Post succsfly'  , comment: neComment});   
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


module.exports = {
    getPosts,
    getPostsById,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost
}
