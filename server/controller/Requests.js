const express= require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');

const {craeteRequestsValidation}  = require('../valdition');



class requstController {

    static async getRequstsUserID(req,res){
        try{
            //Chack user role is user:

            //find his requsts and retuen 

        }
        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getRequstsbyOwnerId(req,res){
        try{
            const allApartments = await User.find({apartmnts: apartmnts});
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

    
}

module.exports = requstController;
