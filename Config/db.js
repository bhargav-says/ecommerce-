const mongoose = require("mongoose")


const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Db connected ${mongoose.connection.name
        }`)
    }
    catch(err){
        console.log(err)

    }
    
        
    
}
module.exports={connectDB}