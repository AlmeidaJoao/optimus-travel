require('dotenv').config({ path: 'config/.env' })
const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
})
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully')
  } catch(error) {
    console.log(error)
    console.log('There was an error establishing database connection')
  }
}

connect()
module.exports = sequelize