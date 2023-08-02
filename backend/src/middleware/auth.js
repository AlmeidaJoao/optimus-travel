require('dotenv'.config({
  path: 'config/.env'
}))
const jwt = require('jsonwebtoken')
const {User, Token} = require('../models/users')

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '')
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const isValidToken = await User.findOne({
      where: {
        user_id: decodedToken._id
      }
    })

    if (!isValidToken) {
      throw new Error()
    }

    const user = await User.findOne({
      where: {
        user_id:decodedToken._id
      }
    })
    req.user = user.toJSON()
    req.token = token
    next()
  } catch (e) {
    
    // Non authenticated users
    req.isAuthenticated = false
    next()
  }
}