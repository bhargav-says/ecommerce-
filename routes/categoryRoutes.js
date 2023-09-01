const express = require("express")
const { requireSignin, isAdmin } = require("../Middleware/authmiddleware")
const { createCategoryC } = require("../controllers/categoryController")


const router = express.Router()


router.post("/create-category",requireSignin,isAdmin,createCategoryC)
 
module.exports =router