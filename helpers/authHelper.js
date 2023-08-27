const bcrypt = require("bcrypt")

const hashedPassword = async(password) =>{
    try{
        const hashedPassword = await bcrypt.hash(password,5)
        return hashedPassword;

    }
    catch(err){
        console.log(err)

    }
}
const comnparePassword = (password,hashedPassword)=>{
     return bcrypt.compare(password,hashedPassword)

}


module.exports = {hashedPassword,comnparePassword}