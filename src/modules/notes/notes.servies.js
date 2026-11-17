import { notesmodel } from "../../DB/models/notes.nodels.js"
import { usersmodel } from "../../DB/models/user.models.js"

export  const createSingleNote = async (content,title,userId)=>{
const create =  await notesmodel.create({content,title,userId})
return {msg:"note create"}
}
export const updataOneNote=async(title,content,userId,noteId)=>{
    const checkUserId= await usersmodel.findById(userId) 
    const checkNoteId= await notesmodel.findById(noteId) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    } else 
        if(checkNoteId===null) {
        return {msg:"notes is not found"}
    } else 
        if (!checkUserId._id.equals(checkNoteId.userId)) {
            return {msg:"you are not owner"}
    }else{
        const updata = await notesmodel.findOneAndUpdate({ _id: noteId },{$set:{title,content}},{runValidators: true, new:true})

        return updata
    }
}    
export const replaceNote =async(title,content,userId,noteId)=>{
const checkUserId= await usersmodel.findById(userId) 
    const checkNoteId= await notesmodel.findById(noteId) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    } else 
        if(checkNoteId===null) {
        return {msg:"notes is not found"}
    } else 
        if (!checkUserId._id.equals(checkNoteId.userId)) {
            return {msg:"you are not owner"}
    }else{
        const updata = await notesmodel.findOneAndReplace({ _id: noteId },{title,content,userId},{runValidators: true, new:true})
        return updata
    }
} 
export const updataManyNote=async(title,userId)=>{
    const checkUserId= await usersmodel.findById(userId) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    
    }else{
        const updata = await notesmodel.updateMany({ userId: userId },{$set:{title}},{runValidators: true})

        return {msg:"all note updata"}
    }
}  
export const deleteOneNote=async(userId,noteId)=>{
    const checkUserId= await usersmodel.findById(userId) 
    const checkNoteId= await notesmodel.findById(noteId) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    } else 
        if(checkNoteId===null) {
        return {msg:"notes is not found"}
    } else 
        if (!checkUserId._id.equals(checkNoteId.userId)) {
            return {msg:"you are not owner"}
    }else{
        const deletenote = await notesmodel.findOneAndDelete({ _id: noteId ,userId:userId})

        return deletenote
    }
}    
export const Pagination = async(userId ,page,limit )=>{
 const UserId= await usersmodel.findById(userId)
 if (UserId===null) {
     return {msg:"user is not found"}
    } else{
        const noteid = await notesmodel.find({userId}).sort({createdAt:-1 }).skip((page-1)*limit).limit(limit) 
       return noteid
    }
}
export const NoteReturn =async(userId,id)=>{
    const checkUserId= await usersmodel.findById(userId) 
    const checkNoteId= await notesmodel.findById(id) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    } else 
        if(checkNoteId===null) {
        return {msg:"notes is not found"}
    } else 
        if (!checkUserId._id.equals(checkNoteId.userId)) {
            return {msg:"you are not owner"}
    }else{
     

        return checkNoteId
    }
} 
export const NoteReturnByContent =async(userId,content)=>{
    const checkUserId= await usersmodel.findById(userId) 
    const checkNote= await notesmodel.find({content:content,userId:userId}) 
    if (checkUserId===null) {
         return {msg:"user is not found"}
    }else{
        return checkNote
    }
} 
export const noteWithUser =async(userId)=>{
const checkUserId= await usersmodel.findById(userId)
    const checkNote= await notesmodel.find({userId:userId}).populate({path:"userId", select:"email"}).select("title,userId,createdAt")
if (checkUserId===null) {
         return {msg:"user is not found"}
    }else{
        return checkNote
    }
}
export const allNote = async(userId,title)=>{
   console.log(typeof(userId));
   
    
    if (title===undefined) {
         const notessss= await notesmodel.aggregate([ { $match: { userId:userId} },{$lookup:{
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users"
    }},{ $unwind: "$users" },
      { $project :{"users.email":1,"users.name":1,_id:0,title:1,createdAt:1}}
    ])
    return notessss
} else {
    const notessss= await notesmodel.aggregate([ { $match: { userId:userId,title:title} },{$lookup:{
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users"
    }},{ $unwind: "$users" },
      { $project :{"users.email":1,"users.name":1,_id:0,title:1,createdAt:1}}
    ])

      return notessss
}}
export const deleteAll= async(userId)=>{
const checkUserId= await usersmodel.findById(userId)

if (checkUserId===null) {
    return {msg:"user not found"}
} else {
    const checkNote= await notesmodel.deleteMany({userId:userId})
    return {msg:"delete all notes"}
} 
}