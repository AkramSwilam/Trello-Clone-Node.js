import { Task } from "../../Database/models/task_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { idObjectChecker } from "../utils/id_object_checker.js";
import { User } from "../../Database/models/user_model.js";
export const addTask=asyncHandler(
    async(req,res,nxt)=>{
        const{title,description}=req.body
        const task=await Task.create({
            description,
            title,
            userId:req.user._id,
        })
        return res.status(201).json({message:"done",task})
    }
)

export const updateTask=asyncHandler(
    async(req,res,nxt)=>{
        const{title,description,status}=req.body
        const newTask=await req.task.updateOne({
            title:title,
            description:description,
            status:status,
            assignTo:req.assignedTo._id
        })

        return res.status(202).json({message:"updated",newTask})
    }
)

export const deleteTask=asyncHandler(
    async(req,res,nxt)=>{
        const deleted=await req.task.deleteOne()
        return res.status(202).json({message:"deleted",deleted})
    }
)

export const getTasksWithUsers=asyncHandler(
    async(req,res,nxt)=>{
        const tasks=await Task.find().populate('userId')
        return res.status(200).json({tasks})
    }
)

export const getUserTasks=asyncHandler(
    async(req,res,nxt)=>{
        const tasks=await Task.find({userId:req.user._id})
        return res.status(200).json({tasks})
    }
)

export const getTasksBeforeDeadline=asyncHandler(
    async(req,res,nxt)=>{
        const tasks=await Task.find().where('deadline').lte(Date.now())
        return res.status(200).json({tasks})
    }
)