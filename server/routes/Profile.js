const express= require('express');
const profile = express.Router();
const control = require('../controller/Profile');
const vertify = require('../config/verifyToken');

profile.get('/', (req,res)=>{
    control.getAllProfile(req,res);
});

//id means user id in all mathods
profile.get('/:id', (req,res)=>{
    control.profileUser(req,res);
});

profile.post('/create-update/:id', (req,res)=>{
    control.createProfile(req,res);
});

//profile.put('/edite/:id', (req,res)=>{
//    control.editeProfile(req,res);
//});


profile.delete('/remove/:id', (req,res)=>{
    control.removeProfile(req,res);
});

//praivte
profile.post('/myRentals/add', vertify, (req,res)=>{
    control.myReantalAdd(req,res);
});
//praivte
profile.delete('/myRentals/deleteOne/:rentId', vertify, (req,res)=>{
    control.myReantalDelete(req,res);
});

profile.delete('/deleteUser', vertify, (req,res)=>{
    control.Deleteuser(req,res);
});

module.exports =profile