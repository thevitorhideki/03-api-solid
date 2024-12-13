import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterService } from './register'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'S3cret123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should hash user's password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
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

  it("shouldn't be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'johndoe@example.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: 'S3cret123',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: 'S3cret123',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
