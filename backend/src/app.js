const express = require('express')

const app = express()

const userRouter = require('./routes/users')
const travelRouter = require('./routes/travel')


app.use(express.json())
app.use(userRouter)
app.use(travelRouter)

app.get('/', (req, res) => {
  res.send('Healthy API')
})


module.exports = app