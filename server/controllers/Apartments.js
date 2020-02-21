const express= require('express');
const mongoose = require('mongoose');
const Apartment =require('../models/Apartments');
const User =require('../models/Users');
const Requests =require('../models/Requests');
const Profile =require('../models/Profile');

const validatMyApartment = require('../validation/apartment');


class ApartmentController {
    static async craeteApartment(req,res){
        try{
           const { errors, isValid } = validatMyApartment(req.body);
    
           // Check Validation
           if (!isValid) {
             // Return any errors with 400 status
             return res.status(400).json(errors);
           }
    
           //chacking if the apartment is alrdy in the DB
           const apartmentExist = await Apartment.findOne({address: req.body.address ,apartmentNum:req.body.apartmentNum});
           if(apartmentExist)
              return res.status(402).send({message: 'Apartment allrady exists'});
    
           //create a new user
           const today=new Date()
           let apartmntData = new Apartment({ 
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
               lat:req.body.lat,
               lng:req.body.lng,
               created: today,
               openHouse : {
                   open : req.body.openHouse_open  
               }
           });
           if(apartmntData){
               //save in apartment colection
               const saveApartment= await apartmntData.save().then(t => t.populate('owner', 'first_name last_name email').execPopulate()) 
               
               //save the apartment in profile colction
               Profile.findOne({ user: req.user._id }).then(profile => {
                   //add to array in profile 
                   const newRent ={ 
                       apartmnt: apartmntData._id,
    
                   };
    
                   profile.apartmnts.unshift(newRent); //this is like push to start
                   profile.save();
               });
               
               res.status(200).send({
                   message: 'Apartment created',
                   apartment: saveApartment
               });
    
           } 
       }
       catch (err) {
           console.error( 'some error occurred', err) 
           res.status(500).send(err.message);        
       };
    }
    


    //update without arrays:
    static async editeApartment2(req,res){
        try{
            //Udete     
            //Do it in if stats becouse i dont want to require fildes. if it cames from user so i set it. 
            const apartmentFileds = {};
            apartmentFileds.owner= req.user._id;
            if(req.body.city) apartmentFileds.city=req.body.city;
            if(req.body.address) apartmentFileds.address=req.body.address;
            if(req.body.price) apartmentFileds.price=req.body.price;
            if(req.body.apartmentNum) apartmentFileds.apartmentNum=req.body.apartmentNum;
            
            if(req.body.parcking) apartmentFileds.parcking=req.body.parcking;
            if(req.body.neebrhood) apartmentFileds.neebrhood=req.body.neebrhood;
            if(req.body.saftyChack) apartmentFileds.saftyChack=req.body.saftyChack;
            if(req.body.desciption) apartmentFileds.desciption=req.body.desciption;
            
            if(req.body.lat) apartmentFileds.lat=req.body.lat;
            if(req.body.lng) apartmentFileds.lng=req.body.lng;
            
            if(req.body.rooms) apartmentFileds.rooms=req.body.rooms;
            if(req.body.loftSize) apartmentFileds.loftSize=req.body.loftSize;
            if(req.body.pats) apartmentFileds.pats=req.body.pats;
            if(req.body.status) apartmentFileds.desciption=req.body.status;

            //objects of fildes
            apartmentFileds.openHouse ={};
            if(req.body.open) apartmentFileds.openHouse.open=req.body.open;
            if(req.body.public) apartmentFileds.openHouse.public=req.body.public;
            if(req.body.date) apartmentFileds.openHouse.date=req.body.date;
            if(req.body.houre) apartmentFileds.openHouse.houre=req.body.houre;
            if(req.body.openANDpublic) apartmentFileds.openANDpublic=req.body.openANDpublic;

            //Update 
            const upadtUser = await Apartment.findOneAndUpdate(
                {_id: req.params.apartmentId} ,
                {$set:apartmentFileds //{
                    //apartmentFileds , "openHouse.invated" : req.body.invated
                    //}   
                }, 
                {new: true},
                (err,result)=>{
                    console.log(6);
                    if(err)
                        return res.status(404).json({'msg' : err});
                }).populate('owner', 'first_name last_name email');
                console.log(upadtUser);

            if(upadtUser)
            return res.status(200).send({message: 'Apartment updated' , Update: upadtUser });  
    
        
        } catch (err) {
            console.error( 'some error occurred');
            console.log(err); 
            res.status(500).send(err.message);        
        }
    }

    static async invated(req,res){
        try{
            const currUser = await User.findOne({ _id: req.user._id });
            if (!currUser)
                return res.status(404).send({message: 'User not found' })
            
            const openHome = await Apartment.findById(req.params.apartmentId)
            if (!openHome)
                return res.status(404).send({message: 'Apartment not found'});
                //need to chack if userId allrady in the array but i have only his id and nothing about him to commper ........what to do....  
            else
                //Add user id to array
                openHome.invated.unshift({ user: req.params.userId });
                openHome.save()
                
                ///set a requst to user whos invaited:    
                 const requst =new Requests({
                     _id: new mongoose.Types.ObjectId(),
                     apartmnt: req.params.apartmentId,
                     sending: req.user._id,
                     resiving: req.params.userId,
                     purpose: 'invation',
                     status: 'invited'
                 });
                // //save in DB the requst
                await requst.save().then(t => t.populate('sending resiving', 'first_name last_name').execPopulate()) 
                
                .then(openHome=> res.status(200).send({message: 'User has added to the Invites open House'}));
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        }         
    }


    static async comming(req,res){
        try{
            const currUser = await User.findById({ _id: req.user._id })
            if (!currUser)
                return res.status(404).send({message: 'User not found' })
                console.log(currUser)

                const  currrApr= await Apartment.findById(req.params.apartmentId)
                if (!currrApr)
                    return res.status(404).send({message: 'Apartment not found'});
                console.log(currrApr.openHouse.open )
                console.log(currrApr)


                //chack if apartment is open house       
                if (currrApr.openHouse.open && currrApr.openHouse.public){ //if both true
                    //chack if user id arllrady sing himself 
                    if (currrApr.usersCamming.filter( usersCamming => String(usersCamming.user) == String(req.user._id) ).length  > 0 ) 
                        return res.status(400).send({message: 'User allrady sign to open house' });  
                            
                    //Add user id to array
                    currrApr.usersCamming.unshift({ user: req.user._id });
                    currrApr.save().then(currrApr=> res.status(200).send({message: 'User has added to the Invites open House'}));
            
            }else
                return res.status(200).send({message: 'Apartment didnt defiend as a openHouse , cnat sign in !'});
        
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        }         
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
                res.status(404).json("Apartments not found");
            } else {
                res.status(200).json(allApartments);
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
            const apartments = await Apartment.findById(req.params.apartmentId).populate('requsts user', 'purpose'); //get the details owner  

            if(!apartments)
                return res.status(404).send({
                    message: 'Aartment not found by the id',
                })
            if(apartments == 0) //desnt work dont know why... retuns null.
                return res.status(404).send({
                    message: 'Aartments not found',
                })
            
            else return res.status(200).send({
                message: 'Aartments found sucssfuly',
                apartments: apartments
               }).populate('usersCamming user usersCamming.user', 'first_name last_name email')
        }catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }

    static async getApartmentByuser(req,res){
        try{
            const userid= req.params.userId;
            const apartments = await Apartment.find({owner: req.params.userId}).populate('owner', 'first_name last_name email'); //get the details owner  
        
            if(!apartments)
                return res.status(404).send({
                    message: 'Aartment not found by the id',
                })
            if(apartments==null) //desnt work dont know why... retuns null.
                return res.status(404).send({
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


    static async search(req,res){
        try{
            const searchFilds = {};
            if(req.body.city) searchFilds.city=req.body.city;
            if(req.body.address) searchFilds.address=req.body.address;
            if(req.body.priceFrom) searchFilds.priceFrom=req.body.priceFrom;
            if(req.body.priceTo) searchFilds.price=req.body.priceTo;
            if(req.body.apartmentNum) searchFilds.apartmentNum=req.body.apartmentNum;
            if(req.body.parcking) searchFilds.parcking=req.body.parcking;
            if(req.body.neebrhood) searchFilds.neebrhood=req.body.neebrhood;
            if(req.body.rooms) searchFilds.rooms=req.body.rooms;
            if(req.body.loftSize) searchFilds.loftSize=req.body.loftSize;
            if(req.body.pats) searchFilds.pats=req.body.pats;
            if(req.body.status) searchFilds.desciption=req.body.status;
            if(req.body.openANDpublic) searchFilds.openANDpublic=req.body.openANDpublic;
            if(req.body.openANDpublic) searchFilds.openANDpublic=req.body.openANDpublic;

            //cant find inner object so did with a flag 
            console.log(searchFilds);
            const serches = await Apartment.find(searchFilds).populate('owner', 'first_name last_name email')
        
            console.log(serches)
            if(serches)
                return res.status(200).send({message: 'Apartments found' , searches : serches });   
            if(serches === [])
                return res.status(404).send({message: 'Apartments not found for this search' });   
        }

        catch (err) {
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message);        
        };
    }


}


module.exports = ApartmentController;