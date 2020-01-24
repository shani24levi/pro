const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');


const ApartmentSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner :{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},//owner must fill his id 
    rentTO: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},

    city:{type:String},
    address :{type: String},
    apartmentNum: {type: Number},
    priceFrom :{ type: Number },
    priceTo :{ type: Number },
    parcking: {type:String},
    neebrhood: {type:String }, 
    saftyChack: {type:Number},
    picturs: { type: Date, default: Date.now},
    desciption: {type:String},
    rooms: {type:Number},
    loftSize: {type:Number},
    schools: [{type:String}],
    date: { type: Date, default: Date.now},
    openHouse: {
        open:{type: Boolean}, 
        date: {type: Date},
        houre: {type: String},
    }, 
    numOfIntrested: {type: Number},
    status: {type: String}, //apartmet is alivlibal or ocupied 
    x: {type: String}, //this is for google maps - will be defind only in the view - client will chose dot on map
    y: {type: String},

    posts :{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    //myInBox: [{type: mongoose.Schema.Types.ObjectId, ref: 'InBox'}],
    //star:{type:Number} //get this from all users in Post schema
}, { collection: 'aprtments' });


const Apartments = mongoose.model( 'Apartments' , ApartmentSchema); 
module.exports = Apartments;