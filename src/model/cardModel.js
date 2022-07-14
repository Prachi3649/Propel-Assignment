const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema ( {

    title : {
        type : String,
        required : true,
        enum : ["Mr", "Miss", "Mrs"]

    },
   firstName:{
    type: String,
    required : true,

   },
   lastName : {
    type : String,
    required : true,

   },
   designation : {
    type : String ,
    required : true

   },
   companyLogo : {
    type : String,
    required : true
   },
   companyName : {
    type : String,
    required : true,

   },
   contactNumber : {
    type : Number,
    required : true,
    
   },
   emailId : {
    type : String,
    required : true,
    lowerCase : true,
    trim : true,
    unique : true,

   },
   websiteURL : {
    type : String,
    required : true,
    trime : true,
    lowerCase :true,
    

   },
   socialURLs : {
    type : [String],
    required : true,
    unique : true,
    trime : true,
    lowerCase :true,
    minLength : [1, 'please provide atlest 1 url'],
    maxLength : 3
   },
   
   
   
}, { timestamps : true})

module.exports = mongoose.model('card', cardSchema)