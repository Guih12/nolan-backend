import { ICreateWeightRepository } from "@/data/repositories/create-weight-repository"
import { Weight } from "@/domain/entities"

export class CreateWeightRepositorySpy implements ICreateWeightRepository {
  incrementCallsCount = 0

  async create(weight: Weight, animalId: string): Promise<boolean> {
    this.incrementCallsCount++
    return true
  }
}