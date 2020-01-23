const jwt= require('jsonwebtoken');

//Middleware functions
module.exports = function(req, res, next) {
    const token =req.header('user-token'); //chacks if we have it in the header- if we do it meens he login
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified =jwt.verify(token, process.env.TOKEN_SECRET);
        //if its verify ok so we add thet the the user
        req.user= verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    };
}



