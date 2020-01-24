const express= require('express');
var cors = require('cors');
const apartments = express.Router();
const control = require('../controller/Apartments');


apartments.post('/', (req,res)=> { 
    control.craeteApartment(req,res);
});


apartments.put('/:apartmentId', (req,res)=>{ 
    control.editeApartment(req,res);
});

apartments.delete('/:apartmentId', (req,res)=>{ 
    control.deleteApartment(req,res);
});

apartments.get('/', (req,res) =>{ 
    control.getAllApartments(req,res);
});

apartments.get('/:apartmentId', (req,res)=> { //BY APARTMENT ID
    control.getApartmentsById(req,res);
});

apartments.get('/user/:userId', (req,res)=> { 
    control.getApartmentByuser(req,res);
});

//dont konw how to do as get...
apartments.post('/search', (req,res)=>{ 
    control.search(req,res);
});


module.exports =apartments