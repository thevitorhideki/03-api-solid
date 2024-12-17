import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, rep: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: req.user.sub,
  })

  return rep.status(200).send({ checkInsCount })
}
