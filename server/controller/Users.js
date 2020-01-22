const express= require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User =require('../models/Users');
const Apartments =require('../models/Apartments');
const Requests =require('../models/Requests');

const gravatar =require('gravatar');
const {regisrerValidation , loginValidation}  = require('../valdition');


class UserController {
    static async registerUser(req,res){
        try{
            //register with google api
            //var userToken = new User({
            //    id_token: req.body.id_token});
            //if(userToken){
            //    await userToken.save()

            //    if(req.session){
            //        req.session.id_token =user.id_token;
                    //save the user in the local storage 
            //        sessionStorage.setItem('user' , user);
            //        return res.status(200).send({
            //            message: 'Logdin seccsfully',
            //             userId: user.id_token 
            //        });
            //    }
            //}else 
            //    return res.status(404).send('conection by google faild');


            //validat the data befor create a user
            const {error} =  regisrerValidation(req.body);
            if(error)
                return res.status(404).send(error.details[0].message);

            //chacking if all form is filed
            if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.role) throw {
                status: 404,
                message: 'Missing Information try again'
            };

            //chacking if the user is alrdy in the DB
            const emailExist = await User.findOne({email: req.body.email});
            if(emailExist)
                return res.status(404).send('Email allrady exists');


            //hash the password using packag bycritjs   
            const salt = await bcrypt.genSalt(10);  // it creats a diffrant pass from whats the user enterd
            const hashPass = await bcrypt.hash(req.body.password, salt);  // hassPass contins the reall password of the user  

            //create avater for poto:
            const avatar= gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            //create a new user
            const today=new Date()
            let userData = new User({ 
                _id: new mongoose.Types.ObjectId(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password:hashPass,
                avatar ,
                role: req.body.role,
                created: today
            });
            if(userData){
                const saveUser = await userData.save();
                res.status(200).send({
                    message: 'User registered',
                    User: saveUser
                });

            } 
            else  res.status(404).send({message: 'Something went wrong whit creating the user'});
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async loginUser(req,res){
        try{
            //login  with google api
            //const finder = await User.findOne({id_token: req.body.id_token});
            //if(!finder){
            //    return res.status(200).json("user was not found");
            //} else 
            //    return res.status(200).send('user login');



            //validat the data befor create a user
           const {error} =  loginValidation(req.body);
            if(error)
               return res.status(400).send({ message: error.details[0].message});
           
            //chacking if all form is filed
           if (!req.body.email || !req.body.password) throw {
                status: 404,
                message: 'Missing Information try again'
           };

            //chacking if the email exists in DB
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(400).send({message:'Email is not found'});
            }
            //chack if password is corect     
            const validPass = await bcrypt.compare(req.body.password, user.password); //comparimg this.user to the data.psss
           if(!validPass) return res.status(400).send({message:'Invalid Password'});
           
            //login sucssfully by db //sign the token
            if(validPass){
                const paylode= { id:user._id , name: user.first_name, email: user.email, role: user.role , avatar: user.avatar} //Craet jwt paylod
                jwt.sign(
                    paylode , 
                    process.env.VERY_SECRET, 
                    {expiresIn: 3600},
                    (err, token)=>{
                        res.json({
                            message: 'Seccsess',
                            token: 'Bearer '+ token
                        });
                    }
                );
            }

            if(user.apartmnts && user.apartmnts.length > 0 ){
                User.populate('apartmnts', 'address', 'city'); //only show address,city.
            }

            res.status(200).send({
                message: 'Logdin seccsfully',
                User: user
            });   
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }



    static async logoutUser(req,res){
        try{
            //chack if user exist in DB (chack if login token exist is in the fronted)
            const usrExist= await User.findOne({email: req.params.email});
            if(!user){
                return res.status(400).send({message:'User is not found'});
            }
            res.status(200).send({
                message: 'User logout'
            })
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getAllUsers(req,res){ 
        try{
            const Exist= await User.find({});
            if (!Exist){
                return res.status(401).send({message:'Users not found'});
            }
            else  
                return res.status(200).send({message:'All Users', users: Exist});
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };        
    }

    static async profileUser(req,res){ 
        try{
            const {id =null} =req.params; 
            const userExist= await User.findOne({id});
            if (!userExist){
                return res.status(401).send({message:'User is not found'});
            }
            else  
                return res.status(200).send({message:'Welcom User to profile!'});
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };        
    }

    static async editeProfile (req,res){
        try{
            //Chacking which params in the schema wants to updat
            const {id}= req.params._id;
            const updateObj={};
            for(const obj of req.body){ //in postman need to do as arry [{....,.....}] else theres error
                updateObj[obj.propName]= obj.value;
            }
            if(!id)
                return res.status(400).send({ message: 'User is not found' }); 
            else{
                const result = await User.update(
                    {_id: id }, 
                    {$set: updateObj }
                );
                if(result){ //chack thet the data is valid
                    res.status(200).json(result).send({
                        message: 'User Update',
                        updated:  result
                    });
                }else{
                    res.status(404).send({message: 'Some thing wrong with data to updat'});
                }
            }
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        }       
    }; 
    
    static async removeProfile (req,res){
        try{
            const {idRemove} =req.params._id; 
            if(idRemove){
                const removeIt = await User.deleteOne({idRemove}); 
                if(removeIt){
                    res.status(200).json(removeIt);
                    res.send({message: `User has been deleted`});
                }
                else res.status(404).send({ message:`Some thing wrong with data`});
            }
            else{
                res.status(400).send({message:`not deleted`}); //never can happen . its unnessessery .
            }
        }catch (err) {
        console.error( 'some error occurred', err) 
        res.status(500).send(err.message); 
    } }  
    
    static async postsByUser (req,res){
        const { id } = req.params;
        if(id){
            const userPost = await User.findById(id).populate('posts'); //like fiirEach loop geting posts     
            res.status(200).json(userPost);
            res.send(`User post : ${userPost}`);
        
        }
        else{
            res.status(400).send(`There is not posts from user`);
        }
    }  


}

module.exports = UserController;

