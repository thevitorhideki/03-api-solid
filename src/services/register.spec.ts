import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterService } from './register'

describe('Register Service', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterService // SUT => System Under Test

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'S3cret123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should hash user's password upon registration", async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'S3cret123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'S3cret123',
      user.passwordHash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'S3cret123',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'S3cret123',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
