const express = require('express')

const app = express()

const userRouter = require('./routes/users')

app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Healthy API')
})


module.exports = app