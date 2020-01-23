const express= require('express');
const mongoose = require('mongoose');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');
const {craeteApartmentValidation}  = require('../valdition');


class ApartmentController {
    static async craeteApartment(req,res){
         try{
            //validat the data befor create
            const {error} =  craeteApartmentValidation(req.body);
            if(error)
                return res.status(404).send(error.details[0].message);

            //chacking if the apartment is alrdy in the DB
            const apartmentExist = await Apartment.findOne({address: req.body.address ,apartmentNum:req.body.apartmentNum});
            if(apartmentExist)
               return res.status(404).send('Apartment allrady exists');

            //create a new user
            const today=new Date()
            let apartmntData = new Apartment({ 
                _id: new mongoose.Types.ObjectId(),
                city: req.body.city,
                address: req.body.address,
                apartmentNum: req.body.apartmentNum,
                priceFrom: req.body.priceFrom,
                priceTo: req.body.priceTo,
                rooms: req.body.rooms,
                owner: req.body.owner,
                created: today
            });
            if(apartmntData){
                const saveApartment= await apartmntData.save().then(t => t.populate('owner').execPopulate()) //(from stack overflow!!!!)
                res.status(200).send({
                    message: 'Apartment created',
                    apartment: saveApartment
                });

            } 
            else res.status(404).send({message: 'Something went wrong craetig apartment'});
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async editeApartment(req,res){
        try{
            const id= req.params.apartmentId;
            const updateObj={};
            for(const obj of req.body){ //in postman need to do as arry [{"propName": "...fild_chang", "value": "...newValur"}] else theres error
                updateObj[obj.propName]= obj.value;
            }
            if(!id)
                return res.status(400).send({ message: 'Apartment is not found' }); 
            else{
                const result = await Apartment.update(
                    {_id: id }, 
                    {$set: updateObj }
                );
                if(result){ //chack thet the data is valid
                    res.status(200).send({
                        message: 'Apartment Update',
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

    static async deleteApartment(req,res){
        try{
            const apartment = await Apartment.findById(req.params.apartmentId);
            if (!apartment) {
                res.status(404).send({message: 'Apartment not found'});
            } else {
                const remov= await Apartment.remove({_id: req.params.apartmentId })
                res.status(200).send({
                    message: 'Apartments removed sucssfuly',
                    removed: remov
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getAllApartments(req,res){
        try{
            const allApartments = await Apartment.find().populate('owner', 'first_name last_name email apartmnts requests posts _id'); //get the details owner    
            if (!allApartments) {
                res.status(200).json("There is no Apartments Avlival to Show");
            } else {
                res.status(200).json(allApartments).send({
                    message: 'All Apartments found',
                    allApartments: allApartments
                })
            }
        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    //by apartment id
    static async getApartmentsById(req,res){
        try{
            const apartments = await Apartment.findById(req.params.apartmentId).populate('owner', 'first_name last_name email apartmnts _id'); //get the details owner  
        

            if(!apartments)
                return res.status(200).send({
                    message: 'Aartment is not found by the id',
                })
            if(apartments==null) //desnt work dont know why... retuns null.
                return res.status(200).send({
                    message: 'Aartments not found',
                })
            
            else return res.status(200).send({
                message: 'Aartments found sucssfuly',
                apartments: apartments
               })
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    //////by user id (ownwr only) //need fixing
    static async getRequstsByuser(req,res){
        try{
            const userid= req.params.userId;
            const apartments = await Apartment.find({userid}).populate('owner', 'first_name last_name email apartmnts _id'); //get the details owner  
        

            if(!apartments)
                return res.status(200).send({
                    message: 'Aartment is not found by the id',
                })
            if(apartments==null) //desnt work dont know why... retuns null.
                return res.status(200).send({
                    message: 'Aartments not found',
                })
            
            else return res.status(200).send({
                message: 'Aartments found sucssfuly',
                apartments: apartments
               })
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    //as a post requst 
    static async search(req,res){
        try{
            //Chack what fildes needs by geting the apartments
            const updateObj={};
            for(const obj of req.body){ //in postman need to do as arry [{"propName": "...fild_chang", "value": "...newValur"}] else theres error
                updateObj[obj.propName]= obj.value;
            }
            //Chack fileds choises - if array is ampty so return all
            if(updateObj==0){
                getAllApartments();
                return res.status(200);
            }
            else{
                //chack array updateObj[] //wont be more then 8 choises to make
                            
                const apartments = await Apartment.find(
                    {id: id }, 
                    {$set: updateObj }
                ).populate('owner', 'first_name last_name email apartmnts requsts _id'); //get the details owner  . i want users can see all requsts owner has.

                if(apartments){ 
                    res.status(200).send({
                        message: 'Apartment by shearchers choice found',
                        apartments:  apartments
                    });
                }else{
                    res.status(404).send({message: 'Some thing wrong with data to updat'});
                }
            }
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }



}
module.exports = ApartmentController;