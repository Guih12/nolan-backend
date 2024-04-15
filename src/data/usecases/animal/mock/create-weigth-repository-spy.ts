export class CreateWeightRepositorySpy {
  incrementCallsCount = 0

  async create(weight: Weight): Promise<void> {
    this.incrementCallsCount++
  }
}