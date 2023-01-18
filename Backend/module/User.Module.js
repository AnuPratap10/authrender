
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    name:String,
    age:Number
})

const UserModel=mongoose.model("unique",userSchema)

module.exports={UserModel}