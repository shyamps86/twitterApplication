
import { app } from "./app.js"
import { connectDB } from "./src/db/index.js"
import cluster from 'cluster';
import os from 'os'




connectDB()


// if(cluster.isPrimary){
//     console.log(`primary is running with ${process.pid}`);

//     for(let i=0;i<os.cpus.length;i++){
//         cluster.fork()
//     }
//     console.log("process-id",process.pid)
// }
// else{
// }
app.listen(process.env.PORT,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})

console.log()