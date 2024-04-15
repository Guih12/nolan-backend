import { describe, test, expect, vi } from "vitest"
import { SignUpRepositotySpy } from "./mocks/register-repository-spy"
import { SignUp } from "@/data/usecases"
import { EcrypterSpy } from "./mocks/encrypter-spy"
import crypto from "crypto"
import { faker } from "@faker-js/faker"

const makeSut = () => {
  const userRegisterRepositorySpy = new SignUpRepositotySpy()
  const encrypterSpy = new EcrypterSpy()
  const sut = new SignUp(userRegisterRepositorySpy, encrypterSpy)
  return { sut, userRegisterRepositorySpy, encrypterSpy }
}

describe('RegisterUser', () => {
  test('should register new user, when all params is valid and user not exists', async () => {
    const { sut, userRegisterRepositorySpy } = makeSut()
    const response = await sut.execute(faker.person.firstName(), faker.internet.email(), faker.internet.password())
    expect(userRegisterRepositorySpy.incrementCallsCount).toBe(1)
    
    expect(response.getId()).not.toBeUndefined()
    expect(response.getEmail()).not.toBeUndefined()
    expect(response.getName()).not.toBeUndefined()
    expect(response.getPassword()).not.toBeUndefined()
  })

  test("should call encrypter with correct password", async () => {
    const { sut, userRegisterRepositorySpy,  encrypterSpy} = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()
    await sut.execute(faker.person.firstName(), email, password)
    const user = userRegisterRepositorySpy.users.find(user => user.email === email)

    expect(encrypterSpy.calssCount).toBe(1)
    expect(user?.password).toBeDefined()
  })

  test("should return error when user exists", async () => {
    const {sut, userRegisterRepositorySpy} = makeSut()

    const promise = sut.execute("some_name", "some_email", "some_password")

    expect(userRegisterRepositorySpy.incrementCallsFindByEmailCount).toBe(1)
    await expect(promise).rejects.toThrow("User alread exists")
  })

  test("should return error when password length is invalid", async () => {
    const {sut} = makeSut()

    const promise = sut.execute(faker.person.firstName(), faker.internet.email(), faker.internet.password(5))

    await expect(promise).rejects.toThrow("Password length is invalid")
  })
});