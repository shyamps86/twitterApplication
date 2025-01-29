export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch((err)=>next(err))
    }
}

// console.log("paras of register",req,res,next)
// return fn(1,2)+req+res+next;
