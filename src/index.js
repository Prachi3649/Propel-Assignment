const router = require ('./router')
const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const multer = require ('multer')
const app = express()

app.use(multer().any())

app.use ('/' , router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://pankaj:XHR0F0IrqL14JxKZ@cluster0.ajtoy.mongodb.net/propel-Database-DB',{useNewUrlParser:true})
.then( () =>console.log("mongoose is contected..."))
.catch( err => console.log(err))

app.listen(process.env.PORT || 3000, function () {
    console.log("express is running on Port" + (process.env.PORT  || 3000) )
})