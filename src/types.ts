export enum Class {
  AQUATIC = "Aquatic",
  PLANT = "Plant",
  BEAST = "Beast",
  BIRD = "Bird",
  REPTILE = "Reptile",
  DUSK = "Dusk",
  DAWN = "Dawn",
  MECH = "Mech",
}

export enum PartType {
  EYES = "Eyes",
  EARS = "Ears",
  BACK = "Back",
  MOUTH = "Mouth",
  HORN = "Horn",
  TAIL = "Tail"
}

export interface Part {
  id: string
  name: string
  class: Class
  type: PartType
}

export interface AxieDetail {
  id: string
  image: string
  name: string
  auction: {
    currentPriceUSD: string
  },
  class: Class
  parts: Part[]
}