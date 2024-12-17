import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('S3cret123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const sessionResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'S3cret123',
  })

  const { token } = sessionResponse.body

  return { token }
}
