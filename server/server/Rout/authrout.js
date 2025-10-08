import express from "express"
import verifay from "../midleware/auth.js"
const rout=express.Router()
import {login,verify} from "../controler/authcontrol.js" 
rout.post("/login",login)
rout.get("/verify",verifay,verify)
export default rout