const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    first_name:{ type: String, required: true},
    last_name: { type: String, required: true}, 
    email: { type: String, required: true } , 
    avatar: {type: String},
    password: { type: String, required:true  } ,
    role: {type:String, required: true , enum: ["user", "owner"]}, //user or owner -cnat be both. difine who is the user 
    id_token: { type: String, unique: true }, // per user from google sign in
    date: { type: Date, default: Date.now},

    //aboutMe: {type: String},
    apartmnts: [{type:mongoose.Schema.Types.ObjectId, ref:'Apartments'}], //only for owner -list of his apartments
    requests: [{type:mongoose.Schema.Types.ObjectId, ref:'Requests'}], 
    posts : [{type: mongoose.Schema.Types.ObjectId, ref:'Posts'}] //only for user.
}, { collection: 'users' });



const Users = mongoose.model( 'Users' , UserSchema); 
module.exports = Users;

