const express= require('express');
const posts = express.Router();
const control = require('../controller/Posts');



posts.post('/create', (req,res) =>{
    control.createPost(req,res);
});


posts.get('/userPosts' ,(req,res)=>{ 
    control.getPostByUser(req,res);
});

posts.get('/ownerPosts' ,(req,res)=>{ 
    control.getPostByOwner(req,res);
});

posts.put('/update' ,(req,res)=>{ 
    control.updatePost(req,res);
});

posts.delete('/delete' ,(req,res)=>{ 
    control.deletePost(req,res);
});


module.exports =posts;