import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymService } from './create-gym'

describe('Create Gym Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymService // SUT => System Under Test

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia JavaScript',
      description: null,
      phone: null,
      latitude: -23.5988102,
      longitude: -46.6763092,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
