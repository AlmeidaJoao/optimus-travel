const express = require('express')
const router = express.Router()

const authenticator = require('../middleware/auth')
const userController = require('../controllers/users')

router.post('/users', userController.createUserAccount)
router.post('/users/login', userController.loginUser)
router.post('/users/logout', authenticator, userController.logout)
router.get('/users/profile', authenticator, userController.getUser)


module.exports = router
