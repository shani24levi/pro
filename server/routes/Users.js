const express= require('express');
const users = express.Router();
const control = require('../controller/Users');



users.post('/register', (req,res) =>{
    control.registerUser(req,res);
});

users.post('/login', (req,res)=> {
    control.loginUser(req,res);
});

users.post('/logout/:email', (req,res)=> {
    control.logoutUser(req,res);
});

users.get('/profile/:id', (req,res)=>{
    control.profileUser(req,res);
});

users.put('/editeProfile/:id', (req,res)=>{
    control.editeProfile(req,res);
});

users.delete('/removeProfile/:id', (req,res)=>{
    control.removeProfile(req,res);
});

module.exports =users