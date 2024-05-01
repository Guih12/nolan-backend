import { VaccineCard } from "@/domain/entities/vaccine-card"

export class VaccineCardRepositorySpy {
  incrementCalls = 0
  public async create(vaccineCard: VaccineCard[]): Promise<boolean> {
    vaccineCard.map((vaccineCard) => {
      this.incrementCalls++
    })
    return true 
  }
}