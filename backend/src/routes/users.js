const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const userController = require('../controllers/users')

router.post('/users', userController.createUserAccount)
router.post('/users/login', userController.loginUser)
router.post('/users/logout', auth, userController.logout)
router.get('/users/profile', auth, userController.getUser)


module.exports = router
