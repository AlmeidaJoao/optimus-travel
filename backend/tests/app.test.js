const  app = require('../src/app')
const request = require('supertest')
const {userOne, userOneTokenId, setupDatabase} = require('./fixtures/db')
const {Token} =  require('../src/models/users')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  await request(app).post('/users')
    .send({
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      password: '123password'
    })
    .expect(201)
})

test('Should login existing a user', async () => {
  const response = await request(app).post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    }).expect(200)

  const token  = await Token.findAll({
    where: {
      user_id: userOne.user_id
    }
  })
  expect(token[1].dataValues.token_id).toMatch(response.body.token)
})

test('Should not login non existing user', async () => {
  await request(app).post('/users/login')
    .send({
      email: 'harisonwells@example.com',
      password: 'ewardthawne'
    }).expect(400)
})

test('Should get logged user info', async () => {
  await request(app).get('/users/profile')
    .set('Authorization', `Bearer ${userOneTokenId}`)
    .send()
    .expect(200)
})

test('Should not get not logged user info', async () => {
  await request(app).get('/users/profile')
    .send()
    .expect(401)
})

test('Should log out user from all active sessions', async () => {
  await request(app).post('/users/logout-all')
    .set('Authorization', `Bearer ${userOneTokenId}`)
    .send()
    .expect(200)
})


