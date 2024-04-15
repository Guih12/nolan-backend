import { ICreateAnimal, CreateAnimalInput } from "@/domain/usecases/animal/create";
import { describe, test, expect } from "vitest";
import { CreateAnimalRepositorySpy } from "./mock/create-animal-repository-spy";
import { CreateWeightRepositorySpy } from "./mock/create-weigth-repository-spy";

class CreateAnimal implements ICreateAnimal {
  constructor(
    private readonly repository: CreateAnimalRepositorySpy,
    private readonly weightRepository?: CreateWeightRepositorySpy
  ) {}

  async execute(input: CreateAnimalInput): Promise<Animal> {
    const { name, age, type, sex, breed, weight} = input
    const animal = new Animal("any_id", name, age, type, sex, breed)
    const newWeight = new Weight("any_id", weight)
    animal.addWeight(newWeight)
    await this.weightRepository?.create(newWeight)
    await this.repository.create(animal)
    return animal
  }
}

class Weight {
  private id: string
  private value: number

  constructor(id: string, value: number) {
    if(value < 0) throw new Error("Weight is invalid")

    this.id = id
    this.value = value
  }

  public getId(): string {
    return this.id
  }

  public getValue(): number {
    return this.value
  }
}

class Animal {
  private id: string
  private name: string
  private age: number
  private type: string
  private sex: string
  private breed: string
  private weights: Weight[] = []

  constructor(id: string, name: string, age: number, type: string, sex: string, breed: string) {
    if(age < 0) throw new Error("Age is invalid")
    this.id = id
    this.name = name
    this.age = age
    this.type = type
    this.sex = sex
    this.breed = breed
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getAge(): number {
    return this.age
  }

  public getType(): string {
    return this.type
  }

  public getSex(): string {
    return this.sex
  }

  public getBreed(): string {
    return this.breed
  }

  public addWeight(weight: Weight): void {
    this.weights.push(weight)
  }

  public getWeights(): number[] {
    return this.weights.map(i => i.getValue())
  }
}

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