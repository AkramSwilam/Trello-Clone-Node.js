import express from "express"
import { bootstrap } from "./src/index_router.js"
const app=express()
const port=5000

bootstrap(app,express)

app.listen(port,()=>{
    console.log("Server is ON ",port);
})