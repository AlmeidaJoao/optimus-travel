const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const travelController = require('../controllers/travel')

router.get('/travel', travelController.forecast)



module.exports = router
