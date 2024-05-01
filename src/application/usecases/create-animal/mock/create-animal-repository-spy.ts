import { ICreateAnimalRepository } from "@/domain/repositories/create-animal-repository"
import { Animal } from "@/domain/entities"

export class CreateAnimalRepositorySpy implements ICreateAnimalRepository {
  incrementCallsCount = 0

  async create(animal: Animal): Promise<boolean> {
    this.incrementCallsCount++
    return true
  }
}