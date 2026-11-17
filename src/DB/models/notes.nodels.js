
import { model, Schema } from "mongoose";

const notesSchema =new Schema({ title :{type: String, required:true ,validate:{
    validator:(value)=>{
        if (value === value.toUpperCase() ) {
            return false
        }else{
            return true
        }
    }
}}
, content:{type:String,  required:true}
, userId  :{type:Schema.Types.ObjectId , ref: "users" , required:true}
 },{timestamps:true})
export const notesmodel = model("notes",notesSchema) 


