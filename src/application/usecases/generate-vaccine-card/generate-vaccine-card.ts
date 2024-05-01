import { IVaccineCardRepository } from "@/domain/repositories/vaccine-card-repository"
import { IVaccineRepository } from "@/domain/repositories/vaccine-repository"
import { Animal } from "@/domain/entities"
import { Vaccine } from "@/domain/entities/vaccine"
import { VaccineCard } from "@/domain/entities/vaccine-card"
import { v4 as uuidv4 } from 'uuid'
import { GenerateVaccineCardInput } from "./generate-vaccine-card-input"

export class GenerateVaccineCard {
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
    const vaccineCard = new VaccineCard(uuidv4(), animal, vaccine, nextDate, false)
    this.vaccineCardList.push(vaccineCard)

    currentDate.setDate(currentDate.getDate() + 21)
   }
  }

  private async createVaccineCardWithGiardia(animal: Animal) {
    const response = await this.vaccineRepository.getVaccineByName("Giardia")
    const vaccine = new Vaccine(response.id, response.name)
    const vaccineCard = new VaccineCard(uuidv4(), animal, vaccine, new Date(), false)
    this.vaccineCardList.push(vaccineCard)
  }

  private async createVaccineCardWithGripeOral(animal: Animal) {
    const response = await this.vaccineRepository.getVaccineByName("Gripe Oral")
    const vaccine = new Vaccine(response.id, response.name)
    const vaccineCard = new VaccineCard(uuidv4(), animal, vaccine, new Date(), false)
    this.vaccineCardList.push(vaccineCard)
  }
}