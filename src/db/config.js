require("dotenv").config()
const mongooes = require("mongoose")

mongooes.connect(process.env.SECRET_DATABASE,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log("no connection")
})

