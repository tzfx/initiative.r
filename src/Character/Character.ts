export interface CharacterType {
  name: string;
  initiative: number;
  skip: boolean;
  status: any;
  hp?: number;
  ac?: number;
  ssDC?: number;
  avatar?: string;
}

export class Character implements CharacterType {
  constructor(
    public name: string = "",
    public initiative: number = 0,
    public skip: boolean = false,
    public status: any = "",
    public hp?: number,
    public ac?: number,
    public ssDC?: number,
    public avatar?: string
  ) {}

  setSkip(toggle: boolean): Character {
    this.skip = toggle;
    return this;
  }
}
