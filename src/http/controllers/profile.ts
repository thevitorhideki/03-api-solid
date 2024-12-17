import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({ userId: req.user.sub })

  return rep.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}
