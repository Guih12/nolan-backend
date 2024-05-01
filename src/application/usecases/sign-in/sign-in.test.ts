import { describe, it, test, expect } from "vitest";
import { User } from "@/domain/entities";
import { SignInRepositorySpy } from "./mocks/register-repository-spy";
import { SignIn } from "./sign-in";
import { SignInInput } from "./sign-in-input";

const makeSut = () => {
  const signInRepositorySpy = new SignInRepositorySpy()
  const sut = new SignIn(signInRepositorySpy)
  return { sut, signInRepositorySpy }
}

const factoryInput = (input: SignInInput): SignInInput => {
 return {
    email: input.email,
    password: input.password
 }  
}

describe("SignIn", () => {
  test("should return errror when email not found", async () => {
    const { sut, signInRepositorySpy } = makeSut()

    const promise = sut.execute(factoryInput({email: "not_found_email", password: "some_password"}))
    await expect(promise).rejects.toThrow("Email or password is wrong")
    
    expect(signInRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should return error when password is invalid", async () => {
    const { sut, signInRepositorySpy } = makeSut()

    const promise = sut.execute(factoryInput({email: "some_email", password: "invalid_password"}))
    await expect(promise).rejects.toThrow("Email or password is wrong")

    expect(signInRepositorySpy.incrementCallsCount).toBe(1)
  })

  test("should return user when email and password is valid", async () => {
    const { sut } = makeSut()

    const response = await sut.execute(factoryInput({email: "some_email", password: "some_password"}))

    expect(response).toBeInstanceOf(User)
  })
})