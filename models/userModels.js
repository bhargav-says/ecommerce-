const mongoose = require("mongoose")
const Schema = mongoose.Schema



const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,


    },
    Address:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    answer:{
        type:Date,
        required:true
    },
    role:{
        type:Number,
        default:0
    }

},{timestamps:true})


module.exports = mongoose.model('users',userSchema)

