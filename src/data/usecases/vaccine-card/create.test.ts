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

  incrementCalls = 0
  
  async getVaccineByName(name: string): Promise<any> {
    this.incrementCalls++
    return this.vaccines.find(vaccine => vaccine.name === name)
  }
}

class VaccineCardRepositorySpy {
  incrementCalls = 0
  public async create(vaccineCard: VaccineCard[]): Promise<boolean> {
    vaccineCard.map((vaccineCard) => {
      this.incrementCalls++
    })
    return true 
  }
}

export interface IVaccineRepository {
  getVaccineByName(name: string): Promise<any>
}

export interface IVaccineCardRepository {
  create(vaccineCard: VaccineCard[]): Promise<boolean>
}

class CreateVaccineCardSpy implements ICreateVaccineCard {
  vaccineCardList: VaccineCard[] = []

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


type TypeSut = {
  sut: CreateVaccineCardSpy
  vaccineRepositorySpy: VaccineRepositorySpy
  vaccineCardRepositorySpy: VaccineCardRepositorySpy
}

function makeSut(): TypeSut {
  const vaccineRepositorySpy = new VaccineRepositorySpy()
  const vaccineCardRepositorySpy = new VaccineCardRepositorySpy()
  const sut = new CreateVaccineCardSpy(vaccineRepositorySpy, vaccineCardRepositorySpy)
  return {
    sut,
    vaccineRepositorySpy,
    vaccineCardRepositorySpy
  }
}

describe("Create Vaccine Card", () => {
  test("when the animal age have 6 between 9 weeks and never been vaccinated, should create list of vaccines", async () => {
    const animal = new Animal("any_id", "any_name", 6, "any_type", "any_sex", "")
    const {sut, vaccineCardRepositorySpy, vaccineRepositorySpy} = makeSut()

    await sut.execute({animal, vaccine: {}, isVaccinated: false})
    expect(vaccineCardRepositorySpy.incrementCalls).toBe(5)
    expect(vaccineRepositorySpy.incrementCalls).toBe(3)
  })

  test("when the animal have been vaccinated, should not create list of vaccines", async () => {
    const animal = new Animal("any_id", "any_name", 6, "any_type", "any_sex", "")
    const {sut, vaccineCardRepositorySpy, vaccineRepositorySpy } = makeSut()

    await sut.execute({animal, vaccine: {}, isVaccinated: true})
    
    expect(vaccineCardRepositorySpy.incrementCalls).toBe(0)
    expect(vaccineRepositorySpy.incrementCalls).toBe(0)
  })
});