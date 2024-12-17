import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'S3cret123',
  })

  const sessionResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'S3cret123',
  })

  const { token } = sessionResponse.body

  return { token }
}
