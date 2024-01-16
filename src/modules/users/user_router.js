import { Router } from "express";
import * as userController from "./user_controller.js"
import { auth } from "../../middelwares/auth.js";
const router =Router()

router.get("/",auth,userController.getUser)

router.patch("/changePassword",auth,userController.changePassword)

router.patch("/update",auth,userController.updateUser)

router.delete("/delete",auth,userController.deleteUser)

router.delete("/softDelete",auth,userController.softDelete)

router.patch("/logout",auth,userController.logoutUser)

export default router