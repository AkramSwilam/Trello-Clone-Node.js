import { Types } from "mongoose"

export const idObjectChecker=(id)=>{
    if (Types.ObjectId.isValid(id)) {
        return true
    } else {
        return false
    }
}