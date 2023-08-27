const { hashedPassword, comnparePassword } = require("../helpers/authHelper");
const userModels = require("../models/userModels")
const jwt = require("jsonwebtoken")



const registerC = async(req,res)=>{
    try{
        const{name,email,password,Phone,Address} = req.body;
        if(!name||!email||!password||!Phone||!Address)
        {
            res.status(400).json({
                message:"All fields are required"
            })
        }
        //check user
        const existingUser = await userModels.findOne({email})
        //existingUser
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already exist please login"
            })
        }   
        
        //Register User 
        const hashPassword = await hashedPassword(password)

        //save
        const user = await userModels.create({name,email,password:hashPassword,Address,Phone})
        if(user){
            res.status(200).json({
                _id:user._id ,email:user.email,password:user.password,
                success:true,
                message:"User Register Successfully"
            })
        }
        else{
            res.status(400).json({message:"Failed to create user"})
        }

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Error in Resister",err
        })
    }
}


const loginC = async(req,res)=>{
   try{ 
      const {email , password} = req.body;
      //validation
      if(!email || !password){
        return res.status(400).json({
            messasge:"All fields are required",
            success:false
        })
      }
      //check user
      const user = await userModels.findOne({email})
      if(!user){
        return res.status(404).json({
            message:"Email is not registered",
            success:false
        })

       }
      const match = await comnparePassword(password,user.password)
       if(!match){
          return res.status(200).json({
            success:false,
            message:"Invalid Paasword"
          })


       }
       //token
       const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",
         
    })
     res.status(200).json({
        success:true,
        message:"login successfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.Phone,
            address:user.Address

        },
        token,
     })
      
       
   }
   catch(err){
    console.log(err)
    res.status(400).json({
        message:"Error in login",
        success:false
    })
   }
}


const testC = (req,res)=>{
    
     
    res.send("Test route accessed!");
}

   

module.exports = {registerC,loginC,testC}