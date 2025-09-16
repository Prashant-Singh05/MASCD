import request from 'supertest'
import app from '../index.js'
import sequelize from '../config/db.js'
import User from '../models/User.js'

beforeAll(async () => {
  await sequelize.authenticate()
})

afterAll(async () => {
  await sequelize.close()
})

describe('Auth', () => {
  const email = `test_${Date.now()}@example.com`
  const password = 'password123'

  it('registers a new user and returns a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email, password, role: 'customer' })
      .expect(201)
    expect(res.body.token).toBeTruthy()
  })

  it('logs in and returns a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password })
      .expect(200)
    expect(res.body.token).toBeTruthy()
  })
})
