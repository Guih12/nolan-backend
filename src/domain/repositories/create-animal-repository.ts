import { Animal } from "@/domain/entities";

export interface ICreateAnimalRepository {
  create(animal: Animal): Promise<boolean>
}