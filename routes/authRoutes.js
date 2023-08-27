const express = require("express")
const {registerC, loginC, testC} = require("../controllers/authContollers")
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware")

const router = express.Router()

//Method Post || REGISTER 

router.post("/register",registerC)

//METHOD POST ?? LOGIN ROUTE
router.post("/login",loginC)


//test Route 
router.get("/test",requireSignin,isAdmin,testC)




module.exports = router