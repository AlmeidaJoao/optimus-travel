const {User, Token} = require('../models/users')

exports.createUserAccount = async (req, res) => {
  try {
    await User.sync()
    await Token.sync()
    const user = await User.create(req.body)
    const token = await user.generateAuthToken()
    res.status(201).send({user: user.toJSON(), token})
  } catch (e) {
    console.log(e)
    res.status(400).send('Something went wrong')
  }
}

exports.loginUser =  async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user: user.toJSON(), token})
  } catch(e) {
    console.log(e)
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

exports.logout = async (req, res) => {
  try {
    await Token.destroy({where: { token_id: req.token}})

    res.send()
  } catch(e) {
    res.status(400).send()
  }
}