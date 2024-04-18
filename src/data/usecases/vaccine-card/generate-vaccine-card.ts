import { IVaccineCardRepository } from "@/data/repositories/vaccine-card-repository"
import { IVaccineRepository } from "@/data/repositories/vaccine-repository"
import { Animal } from "@/domain/entities"
import { Vaccine } from "@/domain/entities/vaccine"
import { VaccineCard } from "@/domain/entities/vaccine-card"
import { GenerateVaccineCardInput, IGenerateVaccineCard } from "@/domain/usecases/vaccine-card/generate-vaccine-card"

export class GenerateVaccineCard implements IGenerateVaccineCard {
  private vaccineCardList: VaccineCard[] = []

  constructor(
    private readonly vaccineRepository: IVaccineRepository,
    private readonly vaccineCardRepository: IVaccineCardRepository
  ) {}
  
  async execute(input: GenerateVaccineCardInput): Promise<void> {
    if((input.animal.getAge() >= 6 && input.animal.getAge() < 9) && !input.isVaccinated){
      await this.createVaccineCardWithV10(input.animal)
      await this.createVaccineCardWithGiardia(input.animal)
      await this.createVaccineCardWithGripeOral(input.animal)

      await this.vaccineCardRepository.create(this.vaccineCardList)
    }
  }

  private async createVaccineCardWithV10(animal: Animal) {
   let currentDate = new Date()
   const response = await this.vaccineRepository.getVaccineByName("V10")
   const vaccine = new Vaccine(response.id, response.name)

   for(let i=0; i < 3; i++){
    let nextDate = new Date(currentDate)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, nextDate, false)
    this.vaccineCardList.push(vaccineCard)

    currentDate.setDate(currentDate.getDate() + 21)
   }
  }

  private async createVaccineCardWithGiardia(animal: Animal) {
    const response = await this.vaccineRepository.getVaccineByName("Giardia")
    const vaccine = new Vaccine(response.id, response.name)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, new Date(), false)
    this.vaccineCardList.push(vaccineCard)
  }

  private async createVaccineCardWithGripeOral(animal: Animal) {
    const response = await this.vaccineRepository.getVaccineByName("Gripe Oral")
    const vaccine = new Vaccine(response.id, response.name)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, new Date(), false)
    this.vaccineCardList.push(vaccineCard)
  }
}