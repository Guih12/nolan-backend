import { CreateAnimalInput, ICreateAnimal } from "@/domain/usecases/animal/create"
import { Animal, Weight } from "@/domain/entities"
import { ICreateAnimalRepository } from "@/domain/repositories/create-animal-repository"
import { ICreateWeightRepository } from "@/domain/repositories/create-weight-repository"
import { v4 as uuidv4 } from "uuid"

export class CreateAnimal implements ICreateAnimal {
  constructor(
    private readonly createAnimalRepository: ICreateAnimalRepository,
    private readonly createWeightRepository?: ICreateWeightRepository
  ) {}

  async execute(input: CreateAnimalInput): Promise<Animal> {
    const { name, age, type, sex, breed, weight} = input
    const animal = new Animal(await this.generateId(), name, age, type, sex, breed)
    const newWeight = new Weight(await this.generateId(), weight, new Date())
    animal.addWeight(newWeight)
    await this.createAnimalRepository.create(animal)
    await this.createWeightRepository?.create(newWeight, animal.getId())
    return animal
  }

  async generateId(): Promise<string> {
    return uuidv4()
  }
}
