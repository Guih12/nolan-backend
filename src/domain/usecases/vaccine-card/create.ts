import { Animal } from "@/domain/entities"

export interface CreateVaccineCardInput {
 animal: any,
 vaccine: any,
 isVaccinated: boolean,  
}

export interface ICreateVaccineCard {
  execute(input: CreateVaccineCardInput): Promise<void>
}