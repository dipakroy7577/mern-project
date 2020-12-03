require("dotenv").config()
const express = require("express")
const router = new express.Router()
const User = require("../modals/add_user")
const bcrypt = require("bcryptjs")


router.get('/login', async(req,res) => {
    res.render("login")
})

router.post('/login', async(req,res) => {
    try{
        const username = req.body.username
        const password = req.body.password
        // console.log(`${username}  ${password}`)
        const userEmail = await User.findOne({username})
        // console.log(userEmail)
        const passwordMatch = await bcrypt.compare(password,userEmail.password)
        
        const token = await userEmail.generateAuthToken();
        console.log(`the part token ${token}`)

        if(passwordMatch == true){
            res.status(201).render("post")
        }else{
            res.send("Password Not Match")
        }
    }catch(e){
        res.send("invalid login details")
    }
})

router.post("/data",async(req,res)=>{
    const data = await User.find()
    res.send(data)
})

router.get('/users', async(req,res) => {
    res.render("users")
})

router.get('/post', async(req,res) => {
    res.render("post")
})

router.get('/category', async(req,res) => {
    res.render("category")
})

router.get("/add-user",async(req,res)=>{
    res.render("add-user")
})



router.post("/add-user",async (req,res)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.user
    const password = req.body.password
    const role = req.body.role
    // console.log(req.body)
    const registerUser = new User({
        first_name : fname,
        last_name : lname,
        username : username,
        password : password,
        user_role : role
    })

    const token = await registerUser.generateAuthToken();
    // console.log(`the part token ${token}`)
    const register = await registerUser.save()
    // console.log(`the page part ${register}`)
    res.status(201).render("users")

})

module.exports = router