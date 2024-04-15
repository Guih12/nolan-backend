import { ICreateAnimal, CreateAnimalInput } from "@/domain/usecases/animal/create";
import { describe, test, expect } from "vitest";
import { CreateAnimalRepositorySpy } from "./mock/create-animal-repository-spy";
import { CreateWeightRepositorySpy } from "./mock/create-weigth-repository-spy";
import { CreateAnimal } from "./create";

type TypeSut = {
  sut: CreateAnimal,
  createAnimalRepositorySpy: CreateAnimalRepositorySpy,
  createWeightRepositorySpy: CreateWeightRepositorySpy
}

function makeSut(): TypeSut {
  const createAnimalRepositorySpy = new CreateAnimalRepositorySpy()
  const createWeightRepositorySpy = new CreateWeightRepositorySpy()

  const sut = new CreateAnimal(createAnimalRepositorySpy, createWeightRepositorySpy)
  return {
    sut,
    createAnimalRepositorySpy,
    createWeightRepositorySpy
  }
}

describe("Create animal", () => {
  test("should create animal with valid params", async () => {
    const { sut, createAnimalRepositorySpy, createWeightRepositorySpy } = makeSut()
    const response = await sut.execute({
      name: "any_name",
      age: 1,
      type: "any_type",
      sex: "male",
      breed: "",
      weight: 10
    })


    expect(createAnimalRepositorySpy.incrementCallsCount).toBe(1)
    expect(createWeightRepositorySpy.incrementCallsCount).toBe(1)
    expect(response.getId()).not.toBeUndefined()
    expect(response.getName()).toBe("any_name")
    expect(response.getAge()).toBe(1)
    expect(response.getType()).toBe("any_type")
    expect(response.getSex()).toBe("male")
    expect(response.getBreed()).toBe("")
    expect(response.getWeights()).toEqual([10])
  })
  
  test("should return error when age is invalid", async () => {
    const { sut } = makeSut()
    const promise = sut.execute({
      name: "any_name",
      age: -1,
      type: "any_type",
      sex: "male",
      breed: "",
      weight: 10
    })

    await expect(promise).rejects.toThrow("Age is invalid")
  })

  test("should return error when weight is invalid", async () => {
    const { sut } = makeSut()
    const promise = sut.execute({
      name: "any_name",
      age: 1,
      type: "any_type",
      sex: "male",
      breed: "",
      weight: -1
    })

    await expect(promise).rejects.toThrow("Weight is invalid")
  })
})