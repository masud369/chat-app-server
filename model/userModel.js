const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:15,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        max:20,
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvaterImageSet:{
        type:Boolean,
        default:false,
    },
    avaterImage:{
        type:String,
        default:"",
    }

})

module.exports = mongoose.model("Users",userSchema)