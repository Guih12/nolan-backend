import { CreateAnimalInput, ICreateAnimal } from "@/domain/usecases/animal/create"
import { Animal, Weight } from "@/domain/entities"
import { ICreateAnimalRepository } from "@/data/repositories/create-animal-repository"
import { ICreateWeightRepository } from "@/data/repositories/create-weight-repository"

export class CreateAnimal implements ICreateAnimal {
  constructor(
    private readonly createAnimalRepository: ICreateAnimalRepository,
    private readonly createWeightRepository?: ICreateWeightRepository
  ) {}

  async execute(input: CreateAnimalInput): Promise<Animal> {
    const { name, age, type, sex, breed, weight} = input
    const animal = new Animal("any_id", name, age, type, sex, breed)
    const newWeight = new Weight("any_id", weight)
    animal.addWeight(newWeight)
    await this.createAnimalRepository.create(animal)
    await this.createWeightRepository?.create(newWeight, animal.getId())
    return animal
  }
}
