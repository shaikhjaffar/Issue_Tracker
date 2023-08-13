//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3000

//middlewares
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(session({
    secret:"My Secreate KEY",
    saveUninitialized:true,
    resave:false
}))

app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
 app.use(express.static('uploads'))
 app.use("",require('./routes/route'))
//template engine
 app.set('view engine','ejs') 

mongoose.connect("mongodb+srv://jaffarShaikh:jaffar@jaffar.sibfqaq.mongodb.net/", { useNewUrlParser:true})

const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once("open", ()=>console.log("connected to database"))
// app.get("/",(req,res)=>{
//     res.send("I am Here!!!!!!")
// })

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})