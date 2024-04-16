import { Animal } from "@/domain/entities";
import { CreateVaccineCardInput, ICreateVaccineCard } from "@/domain/usecases/vaccine-card/create";
import { describe, expect, test } from "vitest";


export class VaccineCard {
  private id: string
  private animal: Animal
  private vaccine: any
  private appliedDate: Date
  private applied: boolean = false

  constructor(id: string, animal: Animal, vaccine: any, appliedDate: Date){
    this.id = id
    this.animal = animal
    this.vaccine = vaccine
    this.appliedDate = appliedDate
  }

  getId(): string {
    return this.id
  }

  getAnimal(): Animal {
    return this.animal
  }

  getVaccine(): any {
    return this.vaccine
  }

  getAppliedDate(): Date {
    return this.appliedDate
  }

  getApplied(): boolean {
    return this.applied
  }
}

export class Vaccine {
  private id: string
  private name: string
  
  constructor(id: string, name: string){
    this.id = id
    this.name = name
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }
}

class VaccineRepositorySpy {
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
  
  async getVaccineByName(name: string): Promise<any> {
    return this.vaccines.find(vaccine => vaccine.name === name)
  }
}

class CreateVaccineCardSpy implements ICreateVaccineCard {
  vaccineCardList: any[] = []

  constructor(private readonly vaccineRepository = new VaccineRepositorySpy()) {}
  
  async execute(input: CreateVaccineCardInput): Promise<void> {
    if((input.animal.getAge() >= 6 && input.animal.getAge() < 9) && input.isVaccinated === false){
      this.createVaccineCardWithV10(input.animal)
      this.createVaccineCardWithGiardia(input.animal)
      this.createVaccineCardWithGripeOral(input.animal)
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

describe("Create Vaccine Card", () => {
  test("when the animal age have 6 between 9 weeks and never been vaccinated, should create list of vaccines", async () => {
    const animal = new Animal("any_id", "any_name", 6, "any_type", "any_sex", "")
    const sut = new CreateVaccineCardSpy();

    await sut.execute({animal, vaccine: {}, isVaccinated: false})

    expect(sut.vaccineCardList.length).toBe(5)
    expect(sut.vaccineCardList[0].getApplied()).toBe(false)
  })

  test("when the animal have been vaccinated, should not create list of vaccines", async () => {
    const animal = new Animal("any_id", "any_name", 6, "any_type", "any_sex", "")
    const sut = new CreateVaccineCardSpy();

    await sut.execute({animal, vaccine: {}, isVaccinated: true})

    expect(sut.vaccineCardList.length).toBe(0)
  })
});