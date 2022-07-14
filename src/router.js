const express = require ('express') 
const router = express.Router()

const cardController = require('./controller/cardController')

router.get ('/test' , function(req,res) {
    res.send ("hii")
})


router.post ('/business-card' , cardController.createCard  )

router.get ('/bussiness-card/:id' , cardController.getCard)
module.exports = router