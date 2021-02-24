import { uuid58 } from "uuid-base58";
import { CharacterType } from "../Character/Character";
import { company } from "faker";

export type Party = {
  id: string;
  name: string;
  description?: string;
  characters: CharacterType[];
  created: Date;
  updated: Date;
  tpk: boolean;
};

export const NewParty: Party = {
    id: uuid58(),
    name: company.companyName(),
    description: company.catchPhrase(),
    characters: [],
    created: new Date(),
    updated: new Date(),
    tpk: false
};
