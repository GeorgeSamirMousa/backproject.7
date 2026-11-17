import { Router } from "express";
import { createSingleNote, deleteOneNote,deleteAll, NoteReturn,noteWithUser,allNote, Pagination, replaceNote,NoteReturnByContent, updataManyNote, updataOneNote } from "./notes.servies.js";
import { Types } from "mongoose";


export const noteRouter=  Router()
noteRouter.post("/notes",async(req,res)=>{
const {userId}=req.query
const {content,title} =req.body
 const result=   await createSingleNote(content,title,userId)
  return res.status(201).json(result)
}) 
noteRouter.patch("/notes/:noteId",async(req,res)=>{
    const {userId}=req.query
    const {noteId}=req.params
    const {title,content} =req.body
const result = await updataOneNote(title,content,userId,noteId) 
    return res.status(200).json(result)
})
 noteRouter.put("/notes/replace/:noteId",async(req,res)=>{
     const {userId}=req.query
     const {noteId}=req.params
      const {title,content} =req.body
      const result = await replaceNote(title,content,userId,noteId) 
       return res.status(200).json(result)
 })
 noteRouter.patch("/note/All",async(req,res)=>{
     const {userId}=req.query
   const {title} =req.body
const result = await updataManyNote(title,userId)
    return res.status(200).json(result)
 })
 noteRouter.delete("/notes/:noteId",async(req,res)=>{
     const {userId}=req.query
     const {noteId}=req.params
      const result = await deleteOneNote(userId,noteId) 
       return res.status(200).json(result)
 })
  noteRouter.get("/notes/paginate-sort",async(req,res)=>{
     const {page,limit}=req.query
     const {userId}=req.query
     const numPage =Number(page)
     const numlimit =Number(limit)
      const result = await Pagination(userId,numPage,numlimit) 
       return res.status(200).json(result)
 })
   noteRouter.get("/notes/:id",async(req,res)=>{
      const {id}=req.params
      const {userId}=req.query
      const result = await NoteReturn(userId,id) 
       return res.status(200).json(result)
 })
  noteRouter.get("/note/note-by-content",async(req,res)=>{
    const {userId}=req.query
    const {content} =req.query
    const result = await NoteReturnByContent(userId,content)
    return res.status(200).json(result)
 })
 noteRouter.get("/note/note-With-User",async(req,res)=>{
    const {userId}=req.query
    const result = await noteWithUser(userId)
    return res.status(200).json(result) 
 })
 noteRouter.get("/note/aggregate",async(req,res)=>{
 const {userId,title}=req.query
 const userid=  new Types.ObjectId(userId)
    const result = await allNote(userid,title)
    return res.status(200).json(result) 
 })



  noteRouter.delete("/Notes",async(req,res)=>{
 const {userId}=req.query

    const result = await deleteAll(userId)
    return res.status(200).json(result) 
 })