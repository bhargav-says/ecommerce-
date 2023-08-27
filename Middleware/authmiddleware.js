const jwt = require("jsonwebtoken")
const userModels = require("../models/userModels");
const { response } = require("express");

//protected Routes token base
const requireSignin = async(req,res,next) =>{
    try{
           const decode = await jwt.verify( req.headers.authorization,
            process.env.JWT_SECRET
           )

           req.id =decode
           next();
    }
    catch(err){
        console.log(err)


    }

}
//admin access \\
const isAdmin = async(req,res,next)=>{
    try{
       const id = await userModels.findById(req.id._id)
       if(id.role !== 1){
        return(
            res.status(400).json({
                message:"UnAuthorized Access"
            })
        
        )

       }
       else{
        
        next()
       }

    }
    catch(err){

        console.log(err)
        res.status(401).json({
            success:false,
            err,
            message:"error in middleware"
        })
    }
}

 module.exports = {requireSignin,isAdmin}