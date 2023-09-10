const express = require("express");
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware");
const { createProductC,getProductC,getAProductC,getPhotoC,deleteProductC,updateProductC } = require("../controllers/productController");
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


// delete
router.delete("/deleteproduct/:pid",requireSignin,isAdmin,deleteProductC)
module.exports =router;


//update product


router.put ("/updateproduct/:pid",
   requireSignin,
   isAdmin,
   formidable(),
 updateProductC)