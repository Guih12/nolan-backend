import { Weight } from "@/domain/entities";

export interface ICreateWeightRepository {
  create: (weight: Weight, animalId: string) => Promise<boolean>
}