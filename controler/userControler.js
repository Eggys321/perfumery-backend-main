const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// register controler
const register_controler = async(req,res)=>{
    const {email,firstname,lastname,password,passwordVerify} = req.body
    try { 
        // validation
        if(!email || !firstname || !lastname || !password || !passwordVerify){
            res.status(400).json(
                {status:"false",errMsg:"please enter all req fields"}
                )
                return
            }
            if(password.length < 6){
                res.status(400).json({status:"false",errMsg:"password length must be atleast 6 chrs"})
            return
        }
        if(password !== passwordVerify){
            return res.status(400).json({status:"false",errMsg:"enter same password twice"})
            
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({status:'false',errMsg:"An acct wii dsame email already exists"})
        }

        // harshing password
        const salt = await bcrypt.genSalt()
        const passwordHarsh = await bcrypt.hash(password,salt)
        
        console.log(passwordHarsh);
        
        const newUser = new userModel({
            email,firstname,lastname,password:passwordHarsh
            
        })
        const savedUser = await newUser.save()
        // res.status(201).json(savedUser)
        // token
        const token = jwt.sign({
            user:savedUser._id
            
        },process.env.JWT_SECRETE)
        console.log(token);
        // console.log('registered successfully');
        
        // saving token in cookie
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     sameSite:"lax",
        //     secure:false,
        // }).send('registration successfull')
        res.json({token})

        
    } catch (error) {
        console.log(error);
        res.status(500).send()
        
    }
}


// login controler

const login_controler = async(req,res)=>{
    const {email,password} = req.body
    try { 
        // validation
        if(!email || !password){
            res.status(400).json(
                {status:"false",errMsg:"please enter all req fields"}
                )
                return
            }
            // finding a registered email and validating email
            const existingUser = await userModel.findOne({email})
            if(!existingUser){
                return res.status(400).json({status:'false',errMsg:"wrong credentials"})
            }
            
            // comparing password and validating password
            const passwordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!passwordCorrect){
            return res.status(400).json({status:'false',errMsg:"wrong credentials"})
        }
        
    
        // token
        const token = jwt.sign({
            user:existingUser._id
            
        },process.env.JWT_SECRETE)
        console.log('logged in');
        
        // getting token from cookie
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     sameSite:"lax",
        //     secure:false,
        // }).send('logged in sucessfully')
        //res,json({token})
        res.status(200).json({token})
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
    }
    
}

// logout controler

const logout_controler = async(req,res)=>{
    // res.cookie("token","",{
    //     httpOnly:true,
    //     sameSite:"lax",
    //     secure:false,
    //     expires:new Date(0)
    // }).send('logged out')
    // console.log("logged out");
    res.json({token:''})


    //res.json({token: kjskjj, })
}


// loggedIn
const loggedIn_controler =(req,res)=>{
    try{
        // console.log(req.cookies);
        // const token = req.cookies.token
        const token = req.headers.authorization
        console.log(token);

        if(!token){
            return res.json(false)
        }

        jwt.verify(token,process.env.JWT_SECRETE)
        res.json(true)

    }catch(err){
       console.log(err);
       res.json(false)
    }

}






module.exports = {
    register_controler,
    login_controler,
    logout_controler,
    loggedIn_controler

}


