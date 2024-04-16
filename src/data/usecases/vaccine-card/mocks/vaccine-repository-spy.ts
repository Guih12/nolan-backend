export class VaccineRepositorySpy {
  vaccines: any[] = [
    {
      id: "any_id",
      name: "V10"
    },
    {
      id: "any_id",
      name: "Giardia"
    },
    {
      id: "any_id",
      name: "Gripe Oral"
    }
  ]

  incrementCalls = 0
  
  async getVaccineByName(name: string): Promise<any> {
    this.incrementCalls++
    return this.vaccines.find(vaccine => vaccine.name === name)
  }
}