

import {Router} from 'express';
import { upload } from '../../middlewares/multer.middleware.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { Register } from '../../controller/user.controller/register.user.js';

const router=Router();

router.route("/register").post(upload.fields([{ name: "image", maxCount: 1 },{ name: "profile", maxCount: 1 },]), async(req,res)=>{
    console.log(req.body);
    console.log(req.files)   //it's mandatory having req.file for upload.single and req.files for upload.fields
    if (req.file) {
        return res.status(400).send("No file uploaded!");
    }
    res.send("File uploaded successfully!");
});

// router.route('/practice').get((req,res)=>{
//     return res.status(200).json(
//         new ApiResponse(200,{
//             payload:[1,2,3,4]
//         })
//     )
// })

router.route("/practice").post(Register)
export default router;