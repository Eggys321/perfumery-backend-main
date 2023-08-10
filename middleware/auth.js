const jwt = require('jsonwebtoken')
// bearer token

function auth (req,res,next){
    try{
        // console.log(req.cookies);
        const token = req.headers.authorization

        if(!token){
            console.log('you mux login fess 2 view d order page');
            res.status(401).json({status:'false',errMessage:'unauthorized'})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRETE)
        req.user = verified.user
        next()

    }catch(err){
        console.log(err);
        res.status(401).json({errMessage:'unauthorized'})
    }

}


module.exports = auth