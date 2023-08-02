const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const travelController = require('../controllers/travel')

router.get('/travel/weather', travelController.forecast)
router.get('/travel/exchange', travelController.exchange)
router.get('/travel/population', travelController.population)



module.exports = router
