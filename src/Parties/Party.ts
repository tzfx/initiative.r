import { uuid58 } from "uuid-base58";
import { CharacterType } from "../Character/Character";
import { company } from "faker";
import { Encounter } from "../Encounter/Encounter"

export interface PartyType {
  id: string;
  name: string;
  description?: string;
  characters: CharacterType[];
  created: Date;
  updated: Date;
  tpk: boolean;
  encounters: Encounter[];
};

export class Party implements PartyType {
  constructor(
    public id: string = uuid58(),
    public name: string = company.companyName(),
    public characters: CharacterType[] = [],
    public created: Date = new Date(),
    public updated: Date = new Date(),
    public tpk: boolean = false,
    public description: string = company.catchPhrase(),
    public encounters = []
  ){}
}


export const NewParty: Party = {
    id: uuid58(),
    name: company.companyName(),
    description: company.catchPhrase(),
    characters: [],
    created: new Date(),
    updated: new Date(),
    tpk: false,
    encounters: []
};
