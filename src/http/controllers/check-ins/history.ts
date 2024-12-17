import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, rep: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(req.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    userId: req.user.sub,
    page,
  })

  return rep.status(200).send({ checkIns })
}
