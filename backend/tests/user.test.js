const request = require('supertest')
const app = require('../src/app')

test('Should get /', async () => {
    await request(app).get('/')
        .expect(200)
})