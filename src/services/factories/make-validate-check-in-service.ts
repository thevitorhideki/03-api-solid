import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInRepository() {
  const checkInRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkInRepository)

  return service
}
