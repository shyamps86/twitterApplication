import multer from 'multer';


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images");
    },
    filename:function(req,file,cb){
        const uniqueIndex=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,file.originalname+'-'+uniqueIndex)
    }
})



export const upload=multer({storage})