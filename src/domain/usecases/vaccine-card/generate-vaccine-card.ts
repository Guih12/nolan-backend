import { Animal } from "@/domain/entities"

export interface GenerateVaccineCardInput {
 animal: Animal,
 vaccines: any,
 isVaccinated: boolean,  
}

export interface IGenerateVaccineCard {
  execute(input: GenerateVaccineCardInput): Promise<void>
}