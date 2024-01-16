import { User } from "../../Database/models/user_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const signup=asyncHandler(
    async(req,res,nxt)=>{
        const{name,email,password}=req.body
        const userChecker=await User.findOne({email})
        if (userChecker) {
            return nxt(new Error("email exisit",{cause:409}))
        }
        const hashedPassword=bcrypt.hashSync(password,9)
        const user=await User.create(
            {
                email,
                password:hashedPassword,
                name
            }
        )
        return res.status(201).json({"message":"done",user})
    }
    
)

export const signin=asyncHandler(
    async(req,res,nxt)=>{
        const{email,password}=req.body
        const user =await User.findOne(
            {
                email,
            }
        )
        if (!user) {
            return nxt(new Error("Check email and password"))
        }
        const comparePassword=bcrypt.compareSync(password,user.password)
        if (!comparePassword) {
            return nxt(new Error("Check email and password"))
        }
        const token=jwt.sign({
            name:user.name,
            id:user._id
        },"akraminnodejs")
        return res.status(200).json({user,token})
    }
)