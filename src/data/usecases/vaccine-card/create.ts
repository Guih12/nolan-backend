import { IVaccineCardRepository } from "@/data/repositories/vaccine-card-repository"
import { IVaccineRepository } from "@/data/repositories/vaccine-repository"
import { Animal } from "@/domain/entities"
import { Vaccine } from "@/domain/entities/vaccine"
import { VaccineCard } from "@/domain/entities/vaccine-card"
import { CreateVaccineCardInput, ICreateVaccineCard } from "@/domain/usecases/vaccine-card/create"

export class CreateVaccineCard implements ICreateVaccineCard {
  private vaccineCardList: VaccineCard[] = []

  constructor(
    private readonly vaccineRepository: IVaccineRepository,
    private readonly vaccineCardRepository: IVaccineCardRepository
  ) {}
  
  async execute(input: CreateVaccineCardInput): Promise<void> {
    if((input.animal.getAge() >= 6 && input.animal.getAge() < 9) && input.isVaccinated === false){
      await this.createVaccineCardWithV10(input.animal)
      await this.createVaccineCardWithGiardia(input.animal)
      await this.createVaccineCardWithGripeOral(input.animal)

      await this.vaccineCardRepository.create(this.vaccineCardList)
    }
  }

  private async createVaccineCardWithV10(animal: Animal) {
   let currentDate = new Date()
   const vaccineDB = await this.vaccineRepository.getVaccineByName("V10")
   const vaccine = new Vaccine(vaccineDB.id, vaccineDB.name)

   for(let i=0; i < 3; i++){
    let nextDate = new Date(currentDate)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, nextDate)
    this.vaccineCardList.push(vaccineCard)

    currentDate.setDate(currentDate.getDate() + 21)
   }
  }

  private async createVaccineCardWithGiardia(animal: Animal) {
    const vaccineDB = await this.vaccineRepository.getVaccineByName("Giardia")
    const vaccine = new Vaccine(vaccineDB.id, vaccineDB.name)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, new Date())
    this.vaccineCardList.push(vaccineCard)
  }

  private async createVaccineCardWithGripeOral(animal: Animal) {
    const vaccineDB = await this.vaccineRepository.getVaccineByName("Gripe Oral")
    const vaccine = new Vaccine(vaccineDB.id, vaccineDB.name)
    const vaccineCard = new VaccineCard("any_id", animal, vaccine, new Date())
    this.vaccineCardList.push(vaccineCard)
  }
}