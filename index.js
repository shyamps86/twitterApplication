
import { app } from "./app.js"
import { connectDB } from "./src/db/index.js"

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})