export const applyPlugin=function(schema,options){
    // console.log("schema",schema)
   schema.add({
    phn:{
        type:String,
        required:true,
    }
   })

   schema.pre("save",function(next){
    // console.log(options)
    //  console.log(schema.path("phn").index(true))
    this.phn=options.name
    next();
   })
}