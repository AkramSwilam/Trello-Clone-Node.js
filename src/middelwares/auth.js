import { User } from "../Database/models/user_model.js";
import { asyncHandler } from "../modules/utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { idObjectChecker } from "../modules/utils/id_object_checker.js";
import { Task } from "../Database/models/task_model.js";
export const auth=asyncHandler(
    async(req,res,nxt)=>{
        const{authorization}=req.headers
        const decoded=jwt.verify(authorization,"akraminnodejs")
        if (!decoded) {
            return nxt(new Error("invalid token",{cause:401}))
        }
        const user=await User.findById(decoded.id)
        if (!user) {
            return nxt(new Error("Not registered user"))
        }
        req.user=user
        return nxt()
    }
)


export const tasksAuth=asyncHandler(
    async(req,res,nxt)=>{
        // 1- check userId
        const{authorization}=req.headers
        const decoded=jwt.verify(authorization,"akraminnodejs")
        if (!decoded) {
            return nxt(new Error("invalid token",{cause:401}))
        }
        const user=await User.findById(decoded.id)
        if (!user) {
            return nxt(new Error("Not registered user",{cause:401}))
        }

        //2- check this task owned to this user or not
        const{taskId}=req.body
        if (!idObjectChecker(taskId)) {
            return nxt(new Error("invalid task id",{cause:406}))
        }
        const task=await Task.findOne({
            _id:taskId,
            userId:decoded.id
        })
        if (!task) {
            return nxt(new Error("check task id and user id",{cause:401}))
        }

        //3- check assigned to user
        
       
        req.user=user
        req.task=task
        console.log("passed");
        return nxt()
    }
)

export const taskAssignedAuth=asyncHandler(
async(req,res,nxt)=>{
    const{assignTo}=req.body
    const assignedToDecoded=jwt.verify(assignTo,"akraminnodejs")
    if (!assignedToDecoded) {
        return nxt(new Error("invalid assign to token",{cause:401}))
    }
    const assignedToUser=await User.findById(assignedToDecoded.id)
    if (!assignedToUser) {
        return nxt(new Error("Not registered assigned to user",{cause:409}))
    }
    req.assignedTo=assignedToUser
    return nxt()
}
)