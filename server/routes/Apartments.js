const express= require('express');
var cors = require('cors');
const apartments = express.Router();
const control = require('../controller/Apartments');


apartments.get('/', (req,res) =>{ 
    control.getAllApartments(req,res);
});

apartments.get('/:apartmentId', (req,res)=> { //BY APARTMENT ID
    control.getApartmentsById(req,res);
});

apartments.get('/user/:userId', (req,res)=> { 
    control.getRequstsByuser(req,res);
});

apartments.post('/create', (req,res)=> { 
    control.craeteApartment(req,res);
});


apartments.put('/edite/:apartmentId', (req,res)=>{ 
    control.editeApartment(req,res);
});

apartments.delete('/delete/:apartmentId', (req,res)=>{ 
    control.deleteApartment(req,res);
});

//choose to do as get for not loss it in the next page
apartments.get('/search/:city/:', (req,res)=>{ 
    control.search(req,res);
});


module.exports =apartments