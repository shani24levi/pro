const express= require('express');
const apartments = express.Router();
const passport = require('passport');

const vertify =  passport.authenticate('jwt', { session: false });
const control = require('../controllers/Apartments')

apartments.post('/',vertify, (req,res)=> { 
    control.craeteApartment(req,res);
});


apartments.put('/:apartmentId',vertify, (req,res)=>{ 
    control.editeApartment2(req,res);
});


apartments.post('/invated/:apartmentId/:userId',vertify, (req,res)=>{ 
    control.invated(req,res);
});

//any users can chang 'usersComing filde'
apartments.get('/comingOpen/:apartmentId',vertify, (req,res)=>{ 
    control.comming(req,res);
});

apartments.delete('/:apartmentId', (req,res)=>{ 
    control.deleteApartment(req,res);
});

apartments.get('/all', (req,res) =>{ 
    control.getAllApartments(req,res);
});

apartments.get('/:apartmentId', (req,res)=> { //BY APARTMENT ID
    control.getApartmentsById(req,res);
});

apartments.get('/user/:userId', (req,res)=> { 
    control.getApartmentByuser(req,res);
});


apartments.post('/search', (req,res)=>{ 
    control.search(req,res);
});


module.exports =apartments