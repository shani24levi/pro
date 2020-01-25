const express= require('express');
var cors = require('cors');
const requsts = express.Router();
const control = require('../controller/Requests');
const vertify = require('../config/verifyToken');

//Most are praivte routs

requsts.post('/',vertify, (req,res)=> { 
    control.craeteRequst(req,res);
});

//remove by requst id
requsts.delete('/:requestId',vertify, (req,res)=>{ 
    control.deleteOneRequsts(req,res);
});

//remove by user id
requsts.delete('/user/:requestId',vertify, (req,res)=>{ 
    control.deleteOneRequsts(req,res);
});

requsts.delete('/',vertify, (req,res)=>{ 
    control.deleteAllRequsts(req,res);
});

//choose not to do update requst- when send requst cant change it 

requsts.get('/', (req,res)=> {   
    control.getAllRequsts(req,res);
});

//by id of the requst
requsts.get('/:requestId', (req,res) =>{ 
    control.getRequstsById(req,res);
});

//by id of user
requsts.get('/user/:userId', (req,res) =>{ 
    control.getRequstsByUserId(req,res);
});



module.exports =requsts