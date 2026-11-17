import { error } from "node:console"
import { usersmodel,  } from "../../DB/models/user.models.js"



export const signup =async(user,email)=>{
    const findemail= await usersmodel.findOne({email:email}) 
    if (findemail===null) {
    const createUser = await usersmodel.create(user)  
    createUser 
    return {msg:"user add successfully"}
}else {
    return {msg:"user already exist"}
}}
export const login =async(email,password)=>{
    const findemail= await usersmodel.findOne({email:email})
if (findemail===null) {
    return {msg:"data is wrong"}
}else
    if (findemail.password===password) {
        return{ msg:"ok"}
    }else{
    return{ msg:"Invalid email or password"}
    }

    
}
export const updatadetales =async(id,name,email,age  )=>{
    const findId= await usersmodel.findById(id)
    if (findId===null) {
        return{msg:"user isnot find"}
    }
    else
        if (email!==undefined) {
            const checkEmail= await usersmodel.findOne({email:email,_id:{$ne:id}})
             if (checkEmail!=null) {
            return{msg:"email aready exist"}
            }
        } 
         const update =await usersmodel.updateOne({ _id: id },{$set:{name,email,age}},{runValidators: true})
            return {msg:"user update"}
       
        
}
export const deleteData= async(id)=>{
    const findId= await usersmodel.findById(id)
    if (findId!==null) {
        const deleteUser = await usersmodel.deleteOne({ _id: id })
         return{msg:"delete user"}
    }else{
         return{msg:"user is not found"}
    }
}
export const userdetales=async(id)=>{
    const findId= await usersmodel.findById(id)
    if (findId!==null) {
    
         return findId
    }else{
         return{msg:"user is not found"}
    }
}
