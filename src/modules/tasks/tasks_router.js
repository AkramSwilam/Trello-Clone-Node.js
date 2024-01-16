import { Router } from "express";
import { auth, taskAssignedAuth, tasksAuth } from "../../middelwares/auth.js";
import * as tasksController from "./tasks_controller.js"

const router=Router()

router.post("/add",auth,tasksController.addTask)

router.put("/update",tasksAuth,taskAssignedAuth,tasksController.updateTask)

router.delete("/delete",tasksAuth,tasksController.deleteTask)

router.get("/getWithUsers",tasksController.getTasksWithUsers)

router.get("/oneUser",auth,tasksController.getUserTasks)

router.get("/deadline",tasksController.getTasksBeforeDeadline)


export default router