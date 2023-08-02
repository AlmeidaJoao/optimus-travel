require('dotenv').config({ path: 'config/.env' })
const {User, Token} = require('../../src/models/users')
const jwt = require("jsonwebtoken");

const userOneId = '60b40630-713c-11ec-8cff-7f82f42f57ce'
const userOneTokenId = jwt.sign({_id: userOneId}, process.env.JWT_SECRET)

const userOne = {
  user_id: userOneId,
  name: 'Armando',
  surname: 'Guebuza',
  email: 'armando@example.com',
  password: 'strongpa$$123'
}

const userOneToken = {
  token_id: userOneTokenId,
  user_id: userOneId
}

// Clear database and create a new user
const setupDatabase = async () => {
  await User.destroy({where: {}})
  await Token.destroy({where: {}})
  await User.create(userOne)
  await Token.create(userOneToken)
}

module.exports = {
  userOne,
  userOneTokenId,
  setupDatabase
}