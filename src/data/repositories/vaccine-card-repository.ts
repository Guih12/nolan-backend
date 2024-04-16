import { VaccineCard } from "@/domain/entities/vaccine-card";

export interface IVaccineCardRepository {
  create(vaccineCard: VaccineCard[]): Promise<boolean>
}