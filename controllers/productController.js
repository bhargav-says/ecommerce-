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
                message:"All fields Are required",
                
                

            })
        }
        if(!photo && photo.size>100000){
            return res.status(400).json({
                success:false,
                message:"photo is required and Should be less than 1mb"
            })
        }

        const products = new productModel({...req.fields,slug:slugify(name)})
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

//get Product controller
const getProductC = async(req,res)=>{
    try{
        
        const product = await productModel.find({}).
        populate('category').
        select("-photo")
        .lean()
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

//get Single Product
const getAProductC =async(req,res)=>{
    try{
        const {slug} = req.params;
        const product =await productModel.findOne({slug}).select("-photo").populate({path:"category",select:"name slug -_id"})
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product no found"
            })

        }
        else{
            return res.status(200).json({
                success:true,
                message:"Item Found",
                product
            })
        }

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

const getPhotoC =async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-Type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"SomeThing Went Wrong",
            err
          })
    }
}


// delete product Controller
const deleteProductC = async(req,res)=>{
    try{
       const pid = req.params
       const product = await productModel.findByIdAndDelete(pid)
       return res.status(200).json({
        success:true,
        message:"item deleted successfully",
        product
       })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"something went Wrong",
            err
        })
    }
}





const updateProductC = async(req,res)=>{
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

        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields ,slug:slugify(name)},{new:true})
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
        return res.status(400).json({
            success:false,
            message:'Something went Wrong',
            err
        })
    }
}


module.exports ={createProductC,getProductC,getAProductC,getPhotoC,deleteProductC,updateProductC}