import { log } from "console";
import mongoose from "mongoose";
import chalk from "chalk"
export const dbconneition = async()=>{
   try {
       mongoose.connect("mongodb://localhost:27017"),{
           serverSelectionTimeOutMs:5000
           
        }
        console.log(chalk.green("db is connection successfully"));
   } catch (error) {
    console.log(chalk.red("db is connection failed"));
    
    }
    
}