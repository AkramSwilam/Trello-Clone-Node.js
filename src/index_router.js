import { connectDb } from "./Database/connection.js"
import authRouter from "./modules/auth/auth_router.js"
import userRouter from "./modules/users/user_router.js"
import tasksRouter from "./modules/tasks/tasks_router.js"
import { globalErrorHandler } from "./modules/utils/asyncHandler.js"

export const bootstrap=(app,express)=>{
    app.use(express.json())
    connectDb()
    app.use("/auth",authRouter)
    app.use("/users",userRouter)
    app.use("/tasks",tasksRouter)
    app.use("*",(req,res,nxt)=>{
        return res.json({"pageNotFound":404})
    })
    app.use(globalErrorHandler)
}