import { error } from "console";
import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect(process.env.DB_URL).then(
        (value)=>{
            console.log("Db connected");
        }
    ).catch(
        (error)=>{
            console.log("error in Db ",error);
        }
    )
}
