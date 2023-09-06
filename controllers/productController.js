const  slugify  = require("slugify");
const productModel = require("../models/productModel")
const fs = require("fs")


// create Product Controller
const createProductC =async(req,res)=>{

    try{
        const {name, slug,description, price,category, quantity,shipping} =req.fields;
        const {photo} = req.files;

        if(!name || !description || !price || !category || !quantity)
        {
            return res.status(400).json({
                success:false,
                message:"All fields Are required"

            })
        }
        if(!photo && photo.size>100000){
            return res.status(400).json({
                success:false,
                message:"photo is required and Should be less than 1mb"
            })
        }

        const products = new  productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data =fs.readFileSync(photo.path)
            products.contentType = photo.type
        }
        await products.save()
        res.status(200).json({
            success:true,
            message:"product created Successfully",
            products
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"Something went Wrong",
            err
        })
    }
}

// get Producrt controller
const getProductC = async(req,res)=>{
    try{
        
        const product = await productModel.find({}).select("-photo").lean()
        return res.status(200).send({
            success:true,
            TotalCount :product.length,
            message:"done",
            product,
           
        })

    }
    catch(err){
        console.log(err)
        return res.status(200).json({
            success:false,
            message:"Something Went Wwrong",
            err
        })
    }
}

const getAProductC =async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
            err

        })
    }

}


module.exports ={createProductC,getProductC,getAProductC}