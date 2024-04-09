import { describe, test, expect } from "vitest"

interface RegisterUser {
  create: (name: string, email: string, password: string) => Promise<void>
}

class RegisterUserSpy implements RegisterUser{
  users = [{
    name: "some_name",
    email: "some_email",
    password: "some_password"
  }]

  incrementCallsCreateCount = 0
  async create(name: string, email: string, password: string) {
    const userExists = this.users.find(user => user.email === email)

    if(userExists){
      throw new Error("User alread exists")
    }

    this.incrementCallsCreateCount++
  }
}

describe('RegisterUser', () => {
  test('should register new user, when all params is valid and user not exists', async () => {
    //arrange
    const sut = new RegisterUserSpy()

    //act
    sut.create("some_name", "some_another_email", "some_password")

    //assert
    expect(sut.incrementCallsCreateCount).toBe(1)
  })

  test("should return error when user exists", async () => {
    const sut = new RegisterUserSpy()

    const promise = sut.create("some_name", "some_email", "some_password")

    await expect(promise).rejects.toThrow("User alread exists")
    expect(sut.incrementCallsCreateCount).toBe(0)
  })
});