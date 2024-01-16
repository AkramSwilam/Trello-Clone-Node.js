import { Schema, model } from "mongoose";


const userSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        age:Number,
        gender:{
            type:String,
            enum:['male','female']
        },
        phone:String,
    
    logout:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:false
    }
)

export const User=model("User",userSchema)