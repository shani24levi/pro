const express= require('express');
var cors = require('cors');
const requsts = express.Router();
const control = require('../controller/Requests');


requsts.get('/', (req,res)=> {   //includes user and owner aprtments
    control.getAllRequsts (req,res);
});

requsts.get('/userApartment', (req,res) =>{ 
    control.getRequstsUserID(req,res);
});

requsts.get('/ownerApartment', (req,res)=> { 
    control.getRequstsOwnerId(req,res);
});


requsts.post('/create', (req,res)=> { 
    control.craeteRequsts(req,res);
});


requsts.delete('/deleteRequst', (req,res)=>{ //only for user
    control.deleteRequsts(req,res);
});


requsts.put('/editeApartment', (req,res)=>{ 
    control.editeApartment (req,res);
});

requsts.put('/editeRequst', (req,res)=>{ 
    control.editeRequst (req,res);
});



module.exports =requsts