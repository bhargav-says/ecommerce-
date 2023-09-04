const express = require("express");
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware");
const { createProductC,getProductC } = require("../controllers/productController");
const formidable = require("express-formidable")




const router = express.Router()
//routes 
router.post("/createproduct",requireSignin,isAdmin,formidable(),createProductC)
router.get("/getproduct",getProductC) 

module.exports =router;