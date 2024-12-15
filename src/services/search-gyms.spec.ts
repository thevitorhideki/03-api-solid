import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymService } from './search-gyms'

describe('Search Gyms Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymService // SUT => System Under Test

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia JavaScript',
      description: null,
      phone: null,
      latitude: -23.5988102,
      longitude: -46.6763092,
    })

    await gymsRepository.create({
      title: 'Academia Python',
      description: null,
      phone: null,
      latitude: -23.5988102,
      longitude: -46.6763092,
    })

    const { gyms } = await sut.execute({
      query: 'Python',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Python' }),
    ])
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia JavaScript ${i}`,
        description: null,
        phone: null,
        latitude: -23.5988102,
        longitude: -46.6763092,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia JavaScript 21' }),
      expect.objectContaining({ title: 'Academia JavaScript 22' }),
    ])
  })
})
