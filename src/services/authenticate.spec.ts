import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateService // SUT => System Under Test => Service Under Test

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('S3cret123', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'S3cret123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'S3cret123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('S3cret123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'S3cret',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
