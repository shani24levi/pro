const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title:{type:String},
    subtitle :{type: String}, 
    userID :{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },//???
    aprtmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'Apartments', required: true},
    messag: {type:String},
    star: {type: Number ,default: 1 }, //for ranc the apartment by user
    likes: {type: Number , default: 0 },
    datePost: { type: Date, default: Date.now}
}, { collection: 'posts' });


const Posts = mongoose.model( 'Posts' , PostSchema); 
module.exports = Posts;