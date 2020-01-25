const express= require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');

const {craeteRequestsValidation}  = require('../valdition');


class requstController {

    //missing a check--always enters ther -need chacking agin....
    static async craeteRequst(req,res){
        try{
            //validat the data befor create
            const {error} =  craeteRequestsValidation(req.body);
            if(error)
                return res.status(404).send(error.details[0].message);

            //chacking if the requst from req.user._id is alrdy send
            const requestExist = await Requests.findOne({sending: req.user._id ,resiving:req.body.resiving, purpose:req.body.purpose});
            if(requestExist && ((req.body.purpose) != "reply") ) //becouse if it reply i want to allow to sent more then once 
              return res.status(404).send({message:'Requst has allrady been made by that topic to this user, cant sent agin'});

 
            //Chack both usres exists and Not the same
            const user1Exist = await User.findById(req.user._id);
            const user2Exist = await User.findById(req.body.resiving);
            if((!user1Exist || !user2Exist)) 
               return res.status(404).send({message: 'Users not found'});
            if(String(user1Exist)==String(user2Exist)) 
                return res.status(402).send({message: 'Users cant himself'});
  
                //dont know ...it come to this each time

            //Check if sending/resiving has the apartment id     
            //const apartment1Exist = await Apartment.findOne({owner: req.user._id, _id: req.body.apartmnt});
            //const apartment2Exist = await Apartment.findOne({owner: req.body.resiving, _id: req.body.apartmnt});
            //if(!apartment2Exist || !apartment1Exist)
            //    return res.status(404).send({message: 'Apartment chosen not found'});
     
            if(user1Exist && user2Exist) { //when both exist:
                //create a new requst
                const today=new Date()
                let requstData = new Requests({ 
                    _id: new mongoose.Types.ObjectId(),
                    sending: req.user._id,
                    senderRole: req.user.role,
                    resiving: req.body.resiving,
                    purpose: req.body.purpose,
                    text: req.body.text,
                    status: req.body.status,
                    apartmnt :req.body.apartmnt,
                    created: today
                });

                if(requstData){
                    const saveRequst= await requstData.save().then(t => t.populate('sending resiving', 'first_name last_name').execPopulate()) //(from stack overflow!!!!)
                    res.status(200).send({
                        message: 'Requst created Sucssfly',
                        requst: saveRequst
                    });
                }else res.status(402).send({message: 'Something went wrong craetig requst'});
            } 
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async deleteAllRequsts(req,res){
        try{
            const request = await Requests.findById(req.user._id);
            if (!request) {
                res.status(404).send({message: 'Request not found'});
            } else {
                const remov= await Requests.remove({_id: req.user._id })
                res.status(200).send({
                    message: 'All users Request removed sucssfuly',
                    removed: remov
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async deleteOneRequsts(req,res){
        try{
            const request = await Requests.findById(req.user._id);
            if (!request) {
                res.status(404).send({message: 'Request not found'});
            } else {
                const remov= await Requests.remove({_id: req.user._id })
                res.status(200).send({
                    message: 'All users Request removed sucssfuly',
                    removed: remov
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getAllRequsts(req,res){
        try{
             const allRequsts = await Requests.find().populate('sending resiving apartmnt', 'first_name last_name address city');; //get the details owner    
            if (!allRequsts) {
                res.status(404).json({message: 'Requsts not found'});
            } else {
                res.status(200).send({
                    message: 'All Requests found',
                    allRequsts: allRequsts
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getRequstsById(req,res){
        try{
            const request = await Requests.findById(req.params.requestId).then(t => t.populate('sending resiving', 'first_name last_name').execPopulate()) //(from stack overflow!!!!)
            if(!request)
                return res.status(404).send({
                    message: 'Request not found',
                })
            else 
                return res.status(200).send({
                message: 'Requests found sucssfuly',
                requests: request
               })
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getRequstsByUserId(req,res){
        try{
            const request = await Requests.findById(req.params.userId).then(t => t.populate('sending resiving', 'first_name last_name').execPopulate()) //(from stack overflow!!!!)
            if(!request)
                return res.status(404).send({
                    message: 'Request not found by the user',
                })
            else 
                return res.status(200).send({
                message: 'Users Requests found sucssfuly',
                requests: request
               })
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }


    
}

module.exports = requstController;
