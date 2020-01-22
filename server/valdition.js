const joi = require('joi');


const regisrerValidation = (data)=>{
    const schema={
        first_name: joi.string().min(3).required(),
        last_name: joi.string().min(3).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
        role:joi.string().min(3)
    };
    return joi.validate(data, schema);
}

const loginValidation = (data)=>{
    const schema={
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    };
    return joi.validate(data, schema);
}


const craeteApartmentValidation = (data)=>{
    const schema={
        city: joi.string().min(3).required(),
        address: joi.string().min(3).required(),
        priceFrom: joi.number().min(2).required(),
        priceTo: joi.number().min(2).required(),
        rooms: joi.number().min(1).required(),
        owner: joi.string().required(),
        apartmentNum: joi.number().required(),

    };
    return joi.validate(data, schema);
}

const craeteRequestsValidation = (data)=>{
    const schema={
        apartments: joi.string().required(),
        status: joi.string().min(3).required(),
    };
    return joi.validate(data, schema);
}


module.exports.regisrerValidation= regisrerValidation;
module.exports.loginValidation= loginValidation;
module.exports.craeteApartmentValidation= craeteApartmentValidation;
module.exports.craeteRequestsValidation= craeteRequestsValidation;



