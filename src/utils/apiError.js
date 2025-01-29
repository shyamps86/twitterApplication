class ApiError extends Error{
    constructor(statusCode,message="something went wrong",stack="",errors=[]){
        super(message);
        this.statusCode=statusCode;

        if(stack){
            
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
        this.errors=errors;
    }
}

export {ApiError}
