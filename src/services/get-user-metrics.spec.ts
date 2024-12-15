import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics'

describe('Get User Metrics Service', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsService // SUT => System Under Test

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checkInsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
