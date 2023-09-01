const { default: slugify } = require("slugify")
const categoryModel = require("../models/categoryModel")
const userModels = require("../models/userModels")

const createCategoryC = async (req,res)=>{
  try{
      const name = req.body
      if(!name){
        return res.status(400).json({
            success:false,
            message:"Name is required"
        })
        
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        res.status(200).json({
            success:true,
            message:"Category already exists"
        })
    }
    const categry = await new categoryModel({name,slug:slugify}).save()
    res.status(200).send(
        {
            success:true,
            message:"successfully created",
            categry
        }
    )
  }
  catch (err){
    console.log(err)
    res.status(400).json({
        message:"Something went Wrong",
        err,
        success:false
    })

  }
}
module.exports={createCategoryC}