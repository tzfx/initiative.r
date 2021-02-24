import { CharacterType } from "../Character/Character";

export type Party = {
  id: string;
  name: string;
  characters: CharacterType[];
  created: Date;
  updated: Date;
  tpk: boolean;
};
