const express= require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');

const {craeteRequestsValidation}  = require('../valdition');

//requstId

class requstController {

    static async craeteRequst(req,res){
        try{
            //validat the data befor create
            const {error} =  craeteRequestsValidation(req.body);
            if(error)
                return res.status(404).send(error.details[0].message);

            //chacking if the requst from-to is alrdy in the DB
            const requestExist = await Requests.findOne({who: req.body.who ,owner:req.body.owner, purpose:req.body.purpose});
            if(requestExist) 
              return res.status(404).send('Requst has allrady been made by that topic, cant sent agin');

 
            //Chack both usres exists
            const user1Exist = await User.findOne({who: req.body.who});
            const user2Exist = await User.findOne({owner: req.body.owner});
            if((!user1Exist || !user2Exist) || (user1Exist || !user2Exist) || (!user1Exist || user2Exist)) 
               return res.status(404).send({message: 'Users not found'});
      
            //Check if owner has the apartment id 
            const apartmentExist = await Apartment.findOne({owner: req.body.owner, _id: req.body.apartmnt});
            if(!apartmentExist)
                 return res.status(404).send({message: 'Apartment chosen not found'});

            if(user1Exist && user2Exist) { //when both exist:
                //create a new requst
                const today=new Date()
                let requstData = new Requests({ 
                    _id: new mongoose.Types.ObjectId(),
                    who: req.body.who,
                    owner: req.body.owner,
                    purpose: req.body.purpose,
                    status: req.body.status,
                    apartmnt :req.body.apartmnt,
                    created: today
                });
                //if( req.body.purpose=="replayOwner")
                if(requstData){
                    const saveRequst= await requstData.save().then(t => t.populate('owner').execPopulate()) //(from stack overflow!!!!)
                    res.status(200).send({
                        message: 'Requst created Sucssfly',
                        requst: saveRequst
                    });
                }else res.status(404).send({message: 'Something went wrong craetig requst'});
            } 
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }


    //didnt chack them becouse create dont work:
    static async deleteRequsts(req,res){
        try{
            const request = await Requests.findById(req.params.requestId);
            if (!request) {
                res.status(404).send({message: 'Request not found'});
            } else {
                const remov= await Requests.remove({_id: req.params.requestId })
                res.status(200).send({
                    message: 'Request removed sucssfuly',
                    removed: remov
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async editeApartment(req,res){
        try{
            const id= req.params.requestId;
            const updateObj={};
            for(const obj of req.body){ //in postman need to do as arry [{"propName": "...fild_chang", "value": "...newValur"}] else theres error
                updateObj[obj.propName]= obj.value;
            }
            if(!id)
                return res.status(400).send({ message: 'Requst is not found' }); 
            else{
                const result = await Apartment.update(
                    {_id: id }, 
                    {$set: updateObj }
                );
                if(result){ //chack thet the data is valid
                    res.status(200).send({
                        message: 'Request Update',
                        updated:  result
                    });
                }else{
                    res.status(404).send({message: 'Some thing wrong with data to updat'});
                }
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getAllRequsts(req,res){
        try{
             const allRequsts = await Requests.find().populate('owner', 'first_name last_name email apartmnts requests posts _id').populate('who', 'first_name last_name email apartmnts requests posts _id');; //get the details owner    
            if (!allRequsts) {
                res.status(200).json("There is not Requsts Avlival to Show");
            } else {
                res.status(200).json(allApartments).send({
                    message: 'All Requests found',
                    allApartments: allApartments
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
            const request = await Requests.findById(req.params.requestId).populate('owner', 'first_name last_name email apartmnts _id'); //get the details owner  
            if(!request)
                return res.status(200).send({
                    message: 'Request is not found by the id',
                })
            if(request==null) //desnt work dont know why... retuns null.
                return res.status(200).send({
                    message: 'Requests not found',
                })
            
            else return res.status(200).send({
                message: 'Requests found sucssfuly',
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
