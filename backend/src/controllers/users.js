const {User, Token} = require('../models/users')


/**
 * Creates a new user account.
 * @async
 * @param {import('express').Request} req - The request object containing user information in the request body.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>}
 */
exports.createUserAccount = async (req, res) => {
  try {
    await User.sync()
    await Token.sync()
    const user = await User.create(req.body)
    const token = await user.generateAuthToken()
    res.status(201).send({user: user.toJSON(), token})
  } catch (e) {
    res.status(400).send('Something went wrong')
  }
}

/**
 * Logs in a user.
 * @async
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>}
 */
exports.loginUser =  async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user: user.toJSON(), token})
  } catch(e) {
    res.status(400).send(e.message)
  }
}

exports.getUser = async (req, res) => {
  try {
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

/**
 * Logs out a user by destroying the provided token from the database.
 * @async
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>}
 */
exports.logout = async (req, res) => {
  try {
    await Token.destroy({where: { user_id: req.user.user_id}})
    res.send()
  } catch(e) {
    res.status(400).send()
  }
}