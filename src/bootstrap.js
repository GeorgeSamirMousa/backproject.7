import { dbconneition } from "./DB/DB.connection.js"
import express from "express"
import chalk from "chalk"
import { usersRouter } from "./modules/users/users.controller.js"
import { noteRouter } from "./modules/notes/notes.controller.js"
const app = express( )
export const bootstrap =async(x)=>{
dbconneition()
app.use(express.json())
app.listen(1616,()=>{
console.log(chalk.green("server runnning on port 1616"));
        
    })
    app.use(usersRouter,noteRouter)
}
  