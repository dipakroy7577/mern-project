require("dotenv").config()
const mongooes = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongooes.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    user_role:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})

// generating tokes

userSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id)
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(error){
        // res.send(`the error part ${error}`)
        console.log(`the error part ${error}`)
    }
}

// password jenerate
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        // console.log(this.password)
    }
    next()
})

const User = new mongooes.model("User",userSchema)

module.exports = User