import request from 'supertest'
import app from '../index.js'
import sequelize from '../config/db.js'

beforeAll(async () => {
  await sequelize.authenticate()
})

afterAll(async () => {
  await sequelize.close()
})

describe('Verify', () => {
  it('returns not_found for unknown code', async () => {
    const res = await request(app).post('/api/verify').send({ batch_code: 'UNKNOWN' }).expect(200)
    expect(res.body.result).toBe('not_found')
  })
})
