import { describe, test, expect, vi } from "vitest"
import { IRegisterUser } from "@/domain/usecases/auth/register-user"
import { RegisterUser } from "./register-user"

export interface RegisterUserRepository {
  create: (name: string, email: string, password: string) => Promise<void>
  findByEamil(email: string): Promise<any>
}

class RegisterUserRepositorySpy implements RegisterUserRepository {
  users = [
    {
      name: "some_name",
      email: "some_email",
      password: "some_password"
    }
  ]

  incrementCallsCount = 0
  incrementCallsFindByEmailCount = 0

  async create(name: string, email: string, password: string): Promise<void> {
    this.incrementCallsCount++
    await this.users.push({ name, email, password })
    return 
  }

  async findByEamil(email: string) {
    this.incrementCallsFindByEmailCount++
    return this.users.find(user => user.email === email)
  }

}

const makeSut = () => {
  const userRegisterRepositorySpy = new RegisterUserRepositorySpy()
  const sut = new RegisterUser(userRegisterRepositorySpy)
  return { sut, userRegisterRepositorySpy }
}

describe('RegisterUser', () => {
  test('should register new user, when all params is valid and user not exists', async () => {
    const { sut, userRegisterRepositorySpy } = makeSut()
    await sut.create("some_name", "some_another_email", "some_password")
    expect(userRegisterRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should return error when user exists", async () => {
    const {sut, userRegisterRepositorySpy} = makeSut()

    const promise = sut.create("some_name", "some_email", "some_password")

    expect(userRegisterRepositorySpy.incrementCallsFindByEmailCount).toBe(1)
    await expect(promise).rejects.toThrow("User alread exists")
  })

  test("should return error when password length is invalid", async () => {
    const {sut} = makeSut()

    const promise = sut.create("some_name", "some_another_email", "123")

    await expect(promise).rejects.toThrow("Password length is invalid")
  })
});