import { User } from "../../Database/models/user_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const getUser=asyncHandler(
    async(req,res,nxt)=>{
        return res.status(200).json({user:req.user})
    }
)
export const changePassword=asyncHandler(
    async(req,res,nxt)=>{
        const {authorization}=req.headers;
        if (!req.body.password) {
            return nxt(new Error("Invalid password"))
        }
        // const decoded=jwt.verify(authorization,"akraminnodejs")
        const hashedPassword=bcrypt.hashSync(req.body.password,9)
        let user=req.user
       let updated= await user.updateOne(
        {
            password:hashedPassword
        })
        return res.status(202).json({message:"updated",updated})
    }
)

export const updateUser=asyncHandler(
    async(req,res,nxt)=>{
        const {age,name}=req.body;
        if (!age || !name) {
            return nxt(new Error("Invalid date"))
        }
        let user=req.user
       let updated= await user.updateOne(
        {
            name:name,
            age:age
        })
        return res.status(202).json({message:"updated",updated})
    }
)

export const deleteUser=asyncHandler(
    async(req,res,nxt)=>{
       
        let user=req.user
       const deleted= await user.deleteOne()
        return res.status(202).json({message:"deleted",deleted})
    }
)

export const softDelete=asyncHandler(
    async(req,res,nxt)=>{
       
        let user=req.user

        let deleted= await User.findByIdAndRemove(user._id)
        return res.status(202).json({message:"deleted",deleted})
    }
)

export const logoutUser=asyncHandler(
    async(req,res,nxt)=>{
        let user=req.user;
        user=await user.updateOne({logout:true})
        return res.json({user})
    }
)