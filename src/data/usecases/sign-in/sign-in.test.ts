import { describe, it, test, expect } from "vitest";
import { User } from "@/domain/entities";
import { SignInRepositorySpy } from "./mocks/register-repository-spy";
import { SignIn } from "./sign-in";

const makeSut = () => {
  const signInRepositorySpy = new SignInRepositorySpy()
  const sut = new SignIn(signInRepositorySpy)
  return { sut, signInRepositorySpy }
}

describe("SignIn", () => {
  test("should return errror when email not found", async () => {
    const { sut, signInRepositorySpy } = makeSut()
    const promise = sut.execute("invalid_email", "some_password")
    await expect(promise).rejects.toThrow("User not exists")
    expect(signInRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should return error when password is invalid", async () => {
    const { sut, signInRepositorySpy } = makeSut()
    const promise = sut.execute("some_email", "invalid_password")
    await expect(promise).rejects.toThrow("User not exists")
    expect(signInRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should return user when email and password is valid", async () => {
    const { sut } = makeSut()
    const response = await sut.execute("some_email", "some_password")
    expect(response).toBeInstanceOf(User)
  })
})