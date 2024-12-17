import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.patch('/token/refresh', refresh)

  app.post('/users', register)
  app.post('/sessions', authenticate)
}
