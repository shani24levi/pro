const express= require('express');
const mongoose = require('mongoose');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');
const Profile =require('../models/Profile');

const {profileValidation ,addRentValidation}  = require('../valdition');

class ProfileController {
    static async profileUser(req,res){
         try{
             const user = await Profile.findOne({user: req.params.id}).populate('user', 'first_name avatar');
             if (!user)
                return res.status(404).send({message: 'Profile not found for the user'});  
        
            return res.status(200).send({message: 'Profile found' , User: user});  
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getAllProfile(req,res){
        try{
            const user = await Profile.find().populate('user', 'first_name avatar');
            if (!user)
               return res.status(404).send({message: 'Profiles not found'});  
       
           return res.status(200).send({message: 'Profiles found' , User: user});  
       }
       catch (err) {
           console.error( 'some error occurred', err) 
           res.status(500).send(err.message);        
       };
   }

   //not workingggg not alowd????
    static async createProfile(req,res){
        try{
           //validat the data befor create
           //const {error} =  profileValidation(req.body);
           //if(error)
            //   return res.status(404).send(error.details[0].message);

           //chacking if the user is in the DB
           const userExist = await User.findById({_id: req.body.user});
           if(!userExist)
               return res.status(404).send({message: 'User not exists for craeting profile'});

           //create a new profile     
           //Do it in if stats becouse i dont want to require fildes. if it cames from user so i set it. 
           const profileFildes = {};
           profileFildes.user= req.body.user; //user: req.user._id //from token user
           profileFildes.apartments= req.body.apartments; //user: req.user._id //from token user

           if(req.body.handle) profileFildes.handle=req.body.handle;
           if(req.body.loction) profileFildes.loction=req.body.loction;
           if(req.body.status) profileFildes.status=req.body.status;
           if(req.body.disciption) profileFildes.disciption=req.body.disciption;
          //split into array 
           //if(typeof req.body.aboutMe !== 'undefined') profileFildes.split(',');
           
           //objects of fildes
           profileFildes.aboutMe ={};
           if(req.body.lives) profileFildes.aboutMe.lives=req.body.lives;
           if(req.body.from) profileFildes.aboutMe.from=req.body.from;
           if(req.body.age) profileFildes.aboutMe.age=req.body.age;
           if(req.body.job) profileFildes.aboutMe.job=req.body.job;
           if(req.body.jobTime) profileFildes.aboutMe.jobTime=req.body.jobTime;
           if(req.body.money) profileFildes.aboutMe.money=req.body.money;
           if(req.body.education) profileFildes.aboutMe.education=req.body.education;
           if(req.body.relationship) profileFildes.aboutMe.relationship=req.body.relationship;
           if(req.body.kids) profileFildes.aboutMe.kids=req.body.kids;
          
           profileFildes.social ={};
           if(req.body.twitter) profileFildes.social.twitter=req.body.twitter;
           if(req.body.faceboke) profileFildes.social.faceboke=req.body.faceboke;
           if(req.body.instegram) profileFildes.social.instegram=req.body.instegram;
           if(req.body.youtob) profileFildes.social.youtob=req.body.youtob;

            //chacking if user allrady has profile
            const profileExist = await Profile.findOne({user: req.body.user});
            if(profileExist){ //update
                const upadtUser= await Profile.findOneAndUpdate({user: req.params.user} , {$set: profileFildes}, {new: true});
                return res.status(200).send({message: 'User Profile updated' , Update: upadtUser });
            }
            else {//create
                //Chack if handle exist //mybe i dont need handle i'll think about it 
                const handleUser =await Profile.findOne( {handle: profileFildes.handle});
                if (handleUser)                 
                    return res.status(404).send({message: 'Handle exists'});

                const saveIt = new Profile(profileFildes).save();
                if(saveIt)    
                    return res.status(200).send({message: 'Profile created sucssfuly' ,ProfileUser: saveIt});
 
                else
                    return res.status(400).send({message: 'Something went wrong with data fildes' });
            }
       }
       catch (err) {
           console.error( 'some error occurred', err) 
           res.status(500).send(err.message);        
       };
   }


    static async removeProfile(req,res){
        try{
            const profile = await Profile.findOne(req.params.id); //set in user
            if (!profile) {
                res.status(404).send({message: 'profile not found'});
            } else {
                const remov= await Profile.remove({user: req.params.id })
                res.status(200).send({
                    message: 'Profile removed sucssfuly',
                    removed: remov
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        } 
    }


    static async myReantalAdd(req,res){
        try{
            //validat the data befor create
           const {error} =  addRentValidation(req.body);
           if(error)
               return res.status(404).send(error.details[0].message);

           //chacking if the profile is in the DB
           const userExist =await Profile.findOne({user: req.user._id});
           
           if(!userExist)
                return res.status(404).send({message: 'profile not exists'})

           .then(profile =>{
                //create a new rental// is array in the modle     
                const newRent ={ 
                    address: req.body.address,
                    city: req.body.city,
                    from: req.body.from,
                    to: req.body.to,
                    leftCose: req.body.leftCose,
                    current: req.body.current
                }
                //add to array 
                profile.myReantal.unshift(newRent); //this is like push to start
                profile.save().then(profile=>{ res.status(200).send({message: 'Added renal', newRental: newRent})});  
           })
       }
       catch (err) {
           console.error( 'some error occurred', err) 
           res.status(500).send(err.message);        
       };
   }

   static async myReantalDelete(req,res){
    try{
       const isExist= await Profile.findOne({user: req.user._id})
       if(!isExist)
            return res.status(404).send({message: 'Item not exists'})

       .then(profile => {
        //Get remove index
        const removeIt= profile.myReantal
            .map(item=> item.id)
            .indexOf(req.params.rentId);

        //Splice out of array   
        profile.myReantal.splice(removeIt,1); //remove 1 ite,

        //Re-save it in DB
        const saveIt = profile.save();
        return res.status(200).send({
            message: 'Item deleted sucssfully' ,
            removed :removeIt, 
            currentMyRents: saveIt
         })
       })

   }
   catch (err) {
       console.error( 'some error occurred', err) 
       res.status(500).send(err.message);        
   };
}

  
static async Deleteuser(req,res){
    try{
        const removeProfile= await Profile.findOneAndRemove({user:req.user._id});
        if(!removeProfile)
            return res.status(404).send({message: 'User Profile not exists'})

        //Remove this user from collection 'users'
        const removeUser= await User.findOneAndRemove({_id :req.user._id});
        if(!removeUser)
            return res.status(404).send({message: 'User not exists'});

        return res.status(200).send({message: 'Profile and User deleted secssfuly'});

   }
   catch (err) {
       console.error( 'some error occurred', err) 
       res.status(500).send(err.message);        
   };
}  


}

module.exports = ProfileController;
