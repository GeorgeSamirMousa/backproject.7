import { model, Schema } from "mongoose";


const usersSchema =new Schema({name:{type: String, required:true}
, email:{type:String, unique:true, required:true}
,password :{type:String, required:true}
,phone: {type:String, required:true}
,age :{type:Number, max:60, min:18} })
export const usersmodel = model("users",usersSchema) 