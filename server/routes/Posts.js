const express= require('express');
const posts = express.Router();
const control = require('../controller/Posts');
const vertify = require('../config/verifyToken');


posts.post('/create', vertify ,  (req,res) =>{
    control.createPost(req,res);
});

posts.get('/' ,(req,res)=>{ 
    control.getAllPosts(req,res);
});

//get profile by user id
posts.get('/:userId' ,(req,res)=>{ 
    control.getPostById(req,res);
});

posts.put('/update/:postId' ,(req,res)=>{ 
    control.updatePost(req,res);
});

posts.delete('/delete/:postId' ,(req,res)=>{ 
    control.deletePost(req,res);
});


module.exports =posts;