const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');

const RequestSchema = new Schema({
    apartments :{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartments' },
    //to :users to idOwner , owner to idUser --byId
    who: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //user sent requst to owner and get from owner
    //from is my id user
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //owner get requsts 
    status : {type:String, default: 'apnding'}, //the requst is aprov,declin,invated by owner and  aprovUser\declinUser for invatition
    date: { type: Date, default: Date.now}
}, { collection: 'requests' });


const Requests = mongoose.model( 'Requests' , RequestSchema); 
module.exports = Requests;