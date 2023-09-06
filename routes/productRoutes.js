const express = require("express");
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware");
const { createProductC,getProductC,getAProductC,getPhotoC } = require("../controllers/productController");
const formidable = require("express-formidable")




const router = express.Router()
//routes 

//create product
router.post("/createproduct",requireSignin,isAdmin,formidable(),createProductC)
//get Products ALL
router.get("/getproduct",getProductC) 

// get a product - single Product
router.get("/getaproduct/:slug", getAProductC)

//get photo

router.get("/productphoto/:pid",getPhotoC)

module.exports =router;