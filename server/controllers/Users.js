const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User =require('../models/Users');
const mongoose = require('mongoose');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


async function loginUser(req, res) {
    try {
        const { errors, isValid } = validateLoginInput(req.body);
  
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
      
        const email = req.body.email;
        const password = req.body.password;
      
        // Find user by email
        User.findOne({ email }).then(user => {
          // Check for user
          if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
          }
      
          // Check Password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User Matched
              
              const payload = { id: user.id,  first_name: user.first_name,  last_name: user.last_name,  avatar: user.avatar, role: user.role }; // Create JWT Payload
      
              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          });
        });
     
        
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function registerUser(req, res) {
    try {
        const { errors, isValid } = validateRegisterInput(req.body);
  
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
      
        //Chacking if the user is alrdy in the DB
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist)
            return res.status(402).send('Email allrady exists');


        //Hash the password using packag bycritjs   
        const salt = await bcrypt.genSalt(10);  // it creats a diffrant pass from whats the user enterd
        const hashPass = await bcrypt.hash(req.body.password, salt);  // hassPass contins the reall password of the user  


        //Create avater for poto:
        const avatar = gravatar.url(req.body.email, {
            s: '200', 
            r: 'pg', 
            d: 'mm' 
        });
      
        //Create a new user
        const today=new Date()
            let newUser = new User({ 
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password:hashPass,
              avatar ,
              role: req.body.role,
              created: today
          });

          if(newUser){
            const saveUser = await newUser.save();
            res.status(200).send({
                message: 'User registered',
                User: saveUser
            });
          } 
    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}

async function currentUser(req, res) {
    try {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });

    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
        })
    }
}


module.exports = {
    loginUser,
    registerUser,
    currentUser
};


