const express = require("express")
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware")
const { createCategoryC ,updateCategoryC} = require("../controllers/categoryController")


const router = express.Router()

//create category
router.post("/create-category",
requireSignin,isAdmin
,createCategoryC)



router.put("/update-category",
requireSignin,isAdmin,updateCategoryC)
 
module.exports =router