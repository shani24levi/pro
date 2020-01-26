const mongoose =require('mongoose');
const { Schema, model } = require('mongoose');


const ApartmentSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    rentTO: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    requsts: [ {resiving: {type: mongoose.Schema.Types.ObjectId, ref: 'Requests'}}],
    
    star: [{
        user :{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    }], //for ranc the apartment by user

    city:{type:String},
    address :{type: String},
    price:{type: Number},
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
    pats: {type: String, enum: ["notAllow", "allow", "onlyCats", "smallPats"] },
    date: { type: Date, default: Date.now},
    openHouse: {
        open:{type: Boolean}, 
        public: {type: Boolean},
        date: {type: String},
        houre: {type: String},
        invated:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
    }, 
    status: {type: String ,enum: ["available", "ocupied"]}, 
    x: {type: String}, //this is for google maps - will be defind only in the view - client will chose dot on map
    y: {type: String},

    //posts :{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
}, { collection: 'aprtments' });


const Apartments = mongoose.model( 'Apartments' , ApartmentSchema); 
module.exports = Apartments;