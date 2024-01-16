import { Schema, model } from "mongoose";

const taskSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            enum:['todo','doing','done'],
            default:'todo'
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        assignTo:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        deadline:{
            type:Date
        }
    },
    {
        timestamps:false
    }
)

export const Task=model("Task",taskSchema)