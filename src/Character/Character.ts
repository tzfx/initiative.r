export interface CharacterType {
    name: string;
    initiative: number;
    skip: boolean;
    status: any;
    hp?: number;
    maxhp?: number;
    ac?: number;
    ssDC?: number;
    avatar?: string;
}

export type CharacterColumns =
    | "name"
    | "initiative"
    | "skip"
    | "status"
    | "hp"
    | "ac"
    | "ssDC";

export class Character implements CharacterType {
    constructor(
        public name: string = "",
        public initiative: number = 0,
        public skip: boolean = false,
        public status: any = "",
        public hp?: number,
        public maxhp?: number,
        public ac?: number,
        public ssDC?: number,
        public avatar?: string
    ) {}

    static sort(a: CharacterType, b: CharacterType): number {
        return b.initiative - a.initiative;
    }

    setSkip(toggle: boolean): Character {
        this.skip = toggle;
        return this;
    }
}
