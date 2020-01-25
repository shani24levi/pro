const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');

const RequestSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,

    apartmnt :{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartments' },
    sending: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}, //user sent requst to owner and get from owner
    resiving: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}, //owner get requsts 
    senderRole:{type:String},
    purpose: {type:String}, //the topic of the requst: can be want the apartment, whant more poto, or replay to
    text:{type:String},
    status : {type:String, default: 'apnding'}, //the requst is: apanding(send&waits) aprov,declin,invated by owner and  aprovUser\declinUser for invatition
    date: { type: Date, default: Date.now}
}, { collection: 'requests' });


const Requests = mongoose.model( 'Requests' , RequestSchema); 
module.exports = Requests;
