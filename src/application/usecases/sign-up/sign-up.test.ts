import { describe, test, expect, vi } from "vitest"
import { SignUpRepositotySpy } from "./mocks/register-repository-spy"
import { SignUp } from "@/application/usecases"
import { EcrypterSpy } from "./mocks/encrypter-spy"
import { faker } from "@faker-js/faker"
import { SignUpInput } from "./sign-up-input"

const makeSut = () => {
  const userRegisterRepositorySpy = new SignUpRepositotySpy()
  const encrypterSpy = new EcrypterSpy()
  const sut = new SignUp(userRegisterRepositorySpy, encrypterSpy)
  return { sut, userRegisterRepositorySpy, encrypterSpy }
}

describe('RegisterUser', () => {
  test('should register new user, when all params is valid and user not exists', async () => {
    const { sut, userRegisterRepositorySpy } = makeSut()

    const inputSignUp: SignUpInput = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    } 
    const response = await sut.execute(inputSignUp)
    expect(userRegisterRepositorySpy.incrementCallsCount).toBe(1)
    
    expect(response.getId()).not.toBeUndefined()
    expect(response.getEmail()).not.toBeUndefined()
    expect(response.getName()).not.toBeUndefined()
    expect(response.getPassword()).not.toBeUndefined()
  })

  test("should call encrypter with correct password", async () => {
    const { sut, userRegisterRepositorySpy,  encrypterSpy} = makeSut()

    const password = faker.internet.password(10)
    const email = faker.internet.email()

    const inputSignUp: SignUpInput = {
      name: faker.person.firstName(),
      email,
      password
    }

    await sut.execute(inputSignUp)
    const user = userRegisterRepositorySpy.users.find(user => user.email === email)

    expect(encrypterSpy.calssCount).toBe(1)
    expect(user?.password).toBeDefined()
  })

  test("should return error when user exists", async () => {
    const {sut, userRegisterRepositorySpy} = makeSut()

    const inputSignUp: SignUpInput = {
      name: "some_name",
      email: "some_email",
      password: "some_password"
    }

    const promise = sut.execute(inputSignUp)

    expect(userRegisterRepositorySpy.incrementCallsFindByEmailCount).toBe(1)
    await expect(promise).rejects.toThrow("User alread exists")
  })

  test("should return error when password length is invalid", async () => {
    const {sut} = makeSut()

    const inputSignUp: SignUpInput = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(5)
    }

    const promise = sut.execute(inputSignUp)

    await expect(promise).rejects.toThrow("Password length is invalid")
  })
});