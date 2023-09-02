const express = require("express")
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware")
const { createCategoryC ,updateCategoryC ,getCategoryC,singleCategoryC} = require("../controllers/categoryController")


const router = express.Router()

//create category
router.post("/create-category",
requireSignin,isAdmin
,createCategoryC)


//update Category
router.put("/update-category/:id",
requireSignin,isAdmin,updateCategoryC)


//get all catergory
router.get("/getcategories",getCategoryC)


//Single Category
router.get("/singlecategory/:slug", singleCategoryC)
 
module.exports =router