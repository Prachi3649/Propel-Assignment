
const mongoose = require('mongoose') 

const isValid =  function (value) {
    if(typeof (value) == 'undefined' || value == null )  return false
    if ( typeof (value) == 'string' &&  value.trim().length == 0 ) return false
    if( typeof (value) == 'number' && value == null )  return false

    return true
}

const isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}

const isValidObjectId= function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }

const isValidPhone = function(phone){
    return (/^[6-9]\d{9}$/.test(phone))
}

const isValidURL = function (value) {
    return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(value)
}


const isValidEmail = function (value) {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim())
}

const isValidPincode = (value) =>{
    return /^[1-9][0-9]{5}$/.test(value)
}

module.exports.isValid = isValid
module.exports.isValidString = isValidString
module.exports.isValidObjectId = isValidObjectId
module.exports.isValidURL = isValidURL
module.exports.isValidPhone = isValidPhone
module.exports.isValidEmail = isValidEmail
module.exports.isValidPincode = isValidPincode
