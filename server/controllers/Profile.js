const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load Validation
const validateProfileInput = require('../validation/profile');
const validatMyReantals = require('../validation/reantals');
const validatMyApartment = require('../validation/apartment');


// Load Models
const Profile = require('../models/Profile');
const User = require('../models/Users');
const Apartment = require('../models/Apartments');
const Requests= require('../models/Requests');




async function getCurrentUser(req, res) {
    try {
        const errors = {};

        Profile.findOne({ user: req.user.id })
          .populate('user', ['first_name', 'last_name', 'avatar'])
          .then(profile => {
            if (!profile) {
              errors.noprofile = 'There is no profile for this user';
              return res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })      
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function getAll(req, res) {
    try {
        const errors = {};

        Profile.find()
          .populate('user', ['first_name', 'last_name', 'avatar'])
          .then(profiles => {
            if (!profiles) {
              errors.noprofile = 'There are no profiles';
              return res.status(404).json(errors);
            }
      
            res.status(200).json(profiles);
        })  
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function getByHandle(req, res) {
    try {
        const errors = {};

        Profile.findOne({ handle: req.params.handle })
          .populate('user', ['first_name', 'last_name', 'avatar'])
          .then(profile => {
            if (!profile) {
              errors.noprofile = 'There is no profile for this user';
              res.status(404).json(errors);
            }
      
            res.status(200).json(profile);
        })
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


async function getByUserId(req, res) {
    try {
        const errors = {};

        Profile.findOne({ user: req.params.user_id })
          .populate('user', ['name', 'avatar' ,'role'])
          .then(profile => {
            if (!profile) {
              errors.noprofile = 'There is no profile for this user';
              res.status(404).json(errors);
            }
      
            res.status(200).json(profile);
        })
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function creatProfile(req,res){
  try{
      const { errors, isValid } = validateProfileInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

     //chacking if the user is in the DB
     const userExist = await User.findById({_id: req.user._id});
     if(!userExist)
         return res.status(404).send({message: 'User not exists for craeting profile'});

      //Chack if profile exists
      const profileExist = await Profile.findOne({user: req.user._id});
      if(profileExist)
          return res.status(401).send({message: 'User Profile allrady exists'});  
     else {
         //Create new profile
         let profileData = new Profile({ 
             _id: new mongoose.Types.ObjectId(),
             user: req.user._id,
             hendler: req.body.hendler,
             status: req.body.status,
             disciption: req.body.disciption,
             myReantals: req.body.myReantals,
             aboutMe: req.body.aboutMe,
             social: req.body.social,
         });

         if(profileData){
             const saveUser = await profileData.save();
             res.status(200).send({
                 message: 'User profile created',
                 User: saveUser
             });
          }
     }

  }
 catch (err) {
     console.error( 'some error occurred', err) 
     res.status(500).send(err.message);        
 };
}

async function updeateProfile(req,res){
  try{
      const { errors, isValid } = validateProfileInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
          }
          
      //chacking if the user is in the DB
      const userExist = await User.findById({_id: req.user._id});
      if(!userExist)
          return res.status(404).send({message: 'User not exists for craeting profile'});

      //Udete a profile     
      //Do it in if stats becouse i dont want to require fildes. if it cames from user so i set it. 
      const profileFildes = {};
      profileFildes.user= req.user._id; //login user
      if(req.body.handle) profileFildes.handle=req.body.handle;
      if(req.body.location) profileFildes.location=req.body.location;
      if(req.body.status) profileFildes.status=req.body.status;
      if(req.body.disciption) profileFildes.disciption=req.body.disciption;
      
      //split into array 
      if(typeof req.body.apartments !== 'undefined') {
          //Chack if the id apartment exists:
          const apartmentExist= await Apartment.findOne({_id: req.body.apartments});
          if (!apartmentExist) 
                  return res.status(400).send({message: 'Apartment not exists'});

          profileFildes.apartments=req.body.apartments.split(',');
      }
  
      //objects of fildes
      profileFildes.myReantals ={};
      if(req.body.address) profileFildes.myReantals.address=req.body.address;
      if(req.body.city) profileFildes.myReantals.city=req.body.city;
      if(req.body.from) profileFildes.myReantals.from=req.body.from;
      if(req.body.to) profileFildes.myReantals.to=req.body.to;
      if(req.body.leftCose) profileFildes.myReantals.leftCose=req.body.leftCose;
      if(req.body.current) profileFildes.myReantals.current=req.body.current;

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
      if(req.body.facebook) profileFildes.social.facebook=req.body.facebook;
      if(req.body.youtube) profileFildes.social.youtube=req.body.youtube;

      const profileExist = await Profile.findOne({user: req.user._id});
      if(profileExist){ 
          //Update //(from some reson dont enter to update....)
      const upadtUser= await Profile.findOneAndUpdate({user: req.user._id} , {$set: profileFildes}, {new: true});
          if(upadtUser)
          return res.status(200).send({message: 'User Profile updated' , Update: upadtUser });  
      }
      else {
          //craete:
          
      const newProfile = new Profile(
          //_id: new mongoose.Types.ObjectId(),
          profileFildes
      )
      const saveIt =await newProfile.save().then(t => t.populate('user' , 'first_name last_name').execPopulate());
      if(newProfile)
          return res.status(200).send({message: 'Prifile creaded succfuly',newProfile1: profileFildes  , saveed: saveIt});  
      }
  }
  catch (err) {
      console.error( 'some error occurred', err) 
      res.status(500).send(err.message);        
  };
}


async function myReantalAdd(req,res){
  try{
      const { errors, isValid } = validatMyReantals(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      Profile.findOne({ user: req.user._id }).then(profile => {
          //create a new rental// is array in the modle     
          const newRent ={ 
              address: req.body.address,
              city: req.body.city,
              from: req.body.from,
              to: req.body.to,
              leftCose: req.body.leftCose,
              current: req.body.current
          };
          //add to array 
          profile.myReantals.unshift(newRent); //this is like push to start
          profile.save().then(profile=>{ res.status(200).send({message: 'Added renal', newRental: profile})});  
      });
 }
 catch (err) {
     console.error( 'some error occurred', err) 
     res.status(500).send(err.message);        
 };
}

async function myReantalDelete(req,res){
  try{

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.myReantals
          .map(item => item.id)
          .indexOf(req.params.rentId);

        // Splice out of array
        profile.myReantals.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.status(200).json(profile));
      })
  }catch (err) {
      console.error( 'some error occurred', err) 
      res.status(500).send(err.message);        
  };
}

async function myApartmentAdd(req,res){
  try{
      const { errors, isValid } = validatMyApartment(req.body);

      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      Profile.findOne({ user: req.user._id }).then(profile => {
          const today=new Date()
          let apartmentNew= new Apartment({
              _id: new mongoose.Types.ObjectId(),
              city: req.body.city,
              address: req.body.address,
              apartmentNum: req.body.apartmentNum,
              price: req.body.price,
              rooms: req.body.rooms,
              owner: req.user._id,
              status: req.body.status,
              pats: req.body.pats,
              parcking: req.body.parcking,
              neebrhood: req.body.neebrhood,
              patsaftyChacks: req.body.saftyChack,
              desciption: req.body.desciption,
              loftSize: req.body.loftSize,
              created: today,
              openHouse : {
                  open : req.body.openHouse_open  
              }
          });

          //save in the apartment colection
          if(apartmentNew)
              apartmentNew.save().then(t => t.populate('owner', 'first_name last_name email').execPopulate()) 

          //add to array 
          profile.aprtment.unshift(apartmentNew); //this is like push to start
          profile.save().then(profile=>{ res.status(200).send({message: 'Added apartment', newRental: profile})});  
              
      });
 }
 catch (err) {
     console.error( 'some error occurred', err) 
     res.status(500).send(err.message);        
 };
}


async function deleteProfile(req, res) {
    try {
      const removeProfile= await Profile.findOneAndRemove({user:req.user._id});
      if(!removeProfile)
         return res.status(404).send({message: 'User Profile not exists'})

      //Remove the apartments the user has from collection 'apartments' allso
      const removeApartment= await Apartment.findOneAndRemove({_id :req.user._id});

      //Remove the requst the user has from collection 'requst' allso
      const removeReq= await Requests.findOneAndRemove({_id :req.user._id});
  
      //Remove this user from collection 'users' allso
      const removeUser= await User.findOneAndRemove({_id :req.user._id});
      if(!removeUser)
        return res.status(404).send({message: 'User not exists'});
          
      
      return res.status(200).send({message: 'Profile and User deleted secssfuly'});
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}





module.exports = {
    deleteProfile,
    creatProfile,
    getByUserId,
    getByHandle,
    getAll,
    getCurrentUser,
    myApartmentAdd,
    myReantalDelete,
    myReantalAdd,
    updeateProfile
}

