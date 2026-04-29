import { model, Schema } from "mongoose";

const userSchema =new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    otp:{
        type:String,
    },
    otpExpire:Date
})

export const User = model("user",userSchema)