export class CreateAnimalRepositorySpy {
  incrementCallsCount = 0

  async create(animal: Animal): Promise<void> {
    this.incrementCallsCount++
  }
}