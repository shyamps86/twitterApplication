

import {Router} from 'express';
import { upload } from '../../middlewares/multer.middleware.js';

const router=Router();

router.route("/register").post(upload.fields([{ name: "image", maxCount: 1 },{ name: "profile", maxCount: 1 },]), async(req,res)=>{
    console.log(req.body);
    console.log(req.files)   //it's mandatory having req.file for upload.single and req.files for upload.fields
    if (req.file) {
        return res.status(400).send("No file uploaded!");
    }
    res.send("File uploaded successfully!");
});


export default router;