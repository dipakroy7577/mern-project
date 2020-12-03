require("dotenv").config()
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const router = require("./router/user")
const port = process.env.PORT || 3000
require("./db/config")



app.use(express.json())
app.use(express.urlencoded({extended:true}))

const static_path = path.join(__dirname,"../public")
const templates_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",templates_path)
hbs.registerPartials(partial_path)

app.use(router)

app.listen(port,(err)=>{
    console.log( `post no ${port}`)
})