import { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SearchGymServiceRequest {
  query: string
  page: number
}

interface SearchGymServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymServiceRequest): Promise<SearchGymServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
