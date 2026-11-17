import { Router } from "express";
import { deleteData, login, signup, updatadetales, userdetales } from "./users.servies.js";

export const usersRouter=  Router()
usersRouter.post("/users/signup",async(req,res)=>{
const {user}=req.body
try {
    const result =await signup(user,user.email)
    
    return res.status(201).json(result) 
} catch (error) {
    
    console.log(error);
    
    return res.status(409).json({msg:"user already exist"}) 
    
}
})
usersRouter.post("/users/login",async(req,res)=>{
    const {email,password}=req.body
    try {
    const result =await login(email,password)
    
    return res.status(201).json(result) 
} catch (error) {
    
    console.log(error);
    
    return res.status(409).json({msg:"ok"}) 
}
})
usersRouter.patch("/users/:id",async(req,res)=>{
const {id} =req.params
const {name,email,age }= req.body
try {
    const result =await updatadetales(id,name,email,age)
    
    return res.status(200).json(result) 
} catch (error) {
    
    return res.status(400).json({msg:"error data is not right"}) 
}

})
usersRouter.delete("/users",async(req,res)=>{
    const{id}=req.query
    try {
    const result =await deleteData(id)
    
    return res.status(200).json(result) 
} catch (error) {
    
    
    return res.status(400).json({msg:"error data is not right"}) 
}
})
usersRouter.get("/users",async(req,res)=>{
        const{id}=req.query
    try {
    const result =await userdetales(id)
    
    return res.status(200).json(result) 
} catch (error) {
    
    
    return res.status(400).json({msg:"error data is not right"}) 
}
})

