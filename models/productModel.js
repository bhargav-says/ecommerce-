const mongoose = require("mongoose")
const Schema = mongoose.Schema


const productModel = new Schema({
    name:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,

    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"categories",
        require:true


    },
    quantity:{
        type:Number,
        required:true,

    },
    photo:{
        data:Buffer,
        contentType: String
    },
    shipping:{
        type:Boolean,

    },

},{timestamps:true})


module.exports = mongoose.model("product",productModel)