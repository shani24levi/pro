const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');

//this schama is semiler to Posts . handal privat messgas between users and landlords
const InBoxSchema = new Schema({
    title:{type:String},
    subtitle :{type: String}, 
    userID :{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },//???
    aprtmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'Apartments', required: true},
    messag: {type:String},
    star: {type: Number ,default: 1 }, //for ranc the apartment by user
    datePost: { type: Date, default: Date.now}
}, { collection: 'inbox' });


const Posts = mongoose.model( 'InBox' , InBoxSchema); 
module.exports = InBox;