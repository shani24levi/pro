const express= require('express');
var cors = require('cors');
const requsts = express.Router();
const control = require('../controller/Requests');


requsts.get('/', (req,res)=> {   
    control.getAllRequsts (req,res);
});

requsts.get('/:requestId', (req,res) =>{ 
    control.getRequstsById(req,res);
});


requsts.post('/create', (req,res)=> { 
    control.craeteRequst(req,res);
});


requsts.delete('/delete/:requestId', (req,res)=>{ 
    control.deleteRequsts(req,res);
});


requsts.put('/edite/:requestId', (req,res)=>{ 
    control.editeApartment (req,res);
});




module.exports =requsts