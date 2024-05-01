import { Animal } from "@/domain/entities";
import { describe, expect, test } from "vitest";
import { VaccineRepositorySpy } from "./mocks/vaccine-repository-spy";
import { VaccineCardRepositorySpy } from "./mocks/vaccine-card-repository-spy";
import { GenerateVaccineCard } from "./generate-vaccine-card";

type TypeSut = {
  sut: GenerateVaccineCard
  vaccineRepositorySpy: VaccineRepositorySpy
  vaccineCardRepositorySpy: VaccineCardRepositorySpy
}

function makeSut(): TypeSut {
  const vaccineRepositorySpy = new VaccineRepositorySpy()
  const vaccineCardRepositorySpy = new VaccineCardRepositorySpy()
  const sut = new GenerateVaccineCard(vaccineRepositorySpy, vaccineCardRepositorySpy)
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

    await sut.execute({animal, vaccines: {}, isVaccinated: false})
    expect(vaccineCardRepositorySpy.incrementCalls).toBe(5)
    expect(vaccineRepositorySpy.incrementCalls).toBe(3)
  })

  test("when the animal have been vaccinated, should not create list of vaccines", async () => {
    const animal = new Animal("any_id", "any_name", 6, "any_type", "any_sex", "")
    const {sut, vaccineCardRepositorySpy, vaccineRepositorySpy } = makeSut()

    await sut.execute({animal, vaccines: {}, isVaccinated: true})
    
    expect(vaccineCardRepositorySpy.incrementCalls).toBe(0)
    expect(vaccineRepositorySpy.incrementCalls).toBe(0)
  })
});