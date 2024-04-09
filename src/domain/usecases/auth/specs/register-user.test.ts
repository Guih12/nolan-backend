import { RegisterUser } from "../register-user"
import { describe, test, expect, vi } from "vitest"
import { RegisterUserRepositorySpy } from "./mocks/register-repository-spy"
import { EcrypterSpy } from "./mocks/encrypter-spy"
import crypto from "crypto"
import { faker } from "@faker-js/faker"

const makeSut = () => {
  const userRegisterRepositorySpy = new RegisterUserRepositorySpy()
  const encrypterSpy = new EcrypterSpy()
  const sut = new RegisterUser(userRegisterRepositorySpy, encrypterSpy)
  return { sut, userRegisterRepositorySpy, encrypterSpy }
}

describe('RegisterUser', () => {
  test('should register new user, when all params is valid and user not exists', async () => {
    const { sut, userRegisterRepositorySpy } = makeSut()
    await sut.create(faker.person.firstName(), faker.internet.email(), faker.internet.password())
    expect(userRegisterRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should call encrypter with correct password", async () => {
    const { sut, userRegisterRepositorySpy,  encrypterSpy} = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()
    await sut.create(faker.person.firstName(), email, password)
    const user = userRegisterRepositorySpy.users.find(user => user.email === email)

    expect(encrypterSpy.calssCount).toBe(1)
    expect(user?.password).toBe(crypto.createHash("md5").update(password).digest("hex"))
  })

  test("should return error when user exists", async () => {
    const {sut, userRegisterRepositorySpy} = makeSut()

    const promise = sut.create("some_name", "some_email", "some_password")

    expect(userRegisterRepositorySpy.incrementCallsFindByEmailCount).toBe(1)
    await expect(promise).rejects.toThrow("User alread exists")
  })

  test("should return error when password length is invalid", async () => {
    const {sut} = makeSut()

    const promise = sut.create(faker.person.firstName(), faker.internet.email(), faker.internet.password(5))

    await expect(promise).rejects.toThrow("Password length is invalid")
  })
});