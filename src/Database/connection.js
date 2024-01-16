import { error } from "console";
import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://akramswilam:akram01092802183@cluster0.welzvlq.mongodb.net/trello").then(
        (value)=>{
            console.log("Db connected");
        }
    ).catch(
        (error)=>{
            console.log("error in Db ",error);
        }
    )
}