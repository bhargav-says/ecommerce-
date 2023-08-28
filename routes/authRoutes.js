const express = require("express")
const {registerC, loginC, testC,forgerPassC} = require("../controllers/authContollers")
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware")

const router = express.Router()

//Method Post || REGISTER 

router.post("/register",registerC)

//METHOD POST ?? LOGIN ROUTE
router.post("/login",loginC)


//test Route 
router.get("/test",requireSignin,isAdmin,testC)
//forgot-password || post
 router.post("/forgotpassworddd",forgerPassC)
//protected Routes

router.get("/user-auth",requireSignin ,(req,res)=>{
    res.status(200).send({ok:true})
})




module.exports = router