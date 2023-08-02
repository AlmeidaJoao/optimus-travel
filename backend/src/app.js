const express = require('express')

const app = express()

const userRouter = require('./routes/users')
const travelRouter = require('./routes/travel')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json())
app.use(userRouter)
app.use(travelRouter)

app.get('/', (req, res) => {
  res.send('Healthy API')
})


module.exports = app