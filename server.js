const express = require("express")

 const dotenv = require("dotenv")
 const {connectDB} =require("./Config/db")
 const  authRoutes =require("./routes/authRoutes")
 const categoryRoutes = require("./routes/categoryRoutes")

 const cors = require("cors")


 const app= express()

 dotenv.config()
 connectDB()

 //middleware
  app.use(express.json())
  app.use(cors())
 

 //Routes
 app.use("/api/v1/auth",authRoutes)
 app.use("/api/v1/category",categoryRoutes)

 



app.get("/",(req,res)=>{
    res.status(200).json({
        message:'welcome to ecommerce site' })
})


const port= process.env.Port 
 app.listen(port,()=>{
    console.log(`server is running in Port no: ${port}`);
 })