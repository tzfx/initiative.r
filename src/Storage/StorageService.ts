import * as localforage from "localforage";
import { Party } from "../Parties/Party";

enum STORAGE {
    PARTY = "party",
    ENCOUNTER = "encounter",
}

class StorageServiceSingleton {
    private storage: LocalForage;

    constructor(name: string = "initiative.r") {
        this.storage = localforage.createInstance({ name });
    }

    async put<T>(key: string, value: any) {
        console.debug(`Saving: ${[key, JSON.stringify(value)]}`);
        return await this.storage.setItem<T>(key, value);
    }

    async get<T>(key: string) {
        try {
            return await this.storage.getItem<T>(key);
        } catch (err) {
            console.error(err);
        }
    }

    saveParty = async (party: Party) =>
        await this.get<Party[]>(STORAGE.PARTY).then((parties) =>
            this.put(
                STORAGE.PARTY,
                parties
                    ?.filter((p: Party) => p.id !== party.id)
                    .concat(party) || [party]
            )
        );
    getParties = async () => await this.get<Party[]>(STORAGE.PARTY);

    deleteParty = async (party: Party) => {
        await this.get<Party[]>(STORAGE.PARTY).then((parties) =>
            this.put(
                STORAGE.PARTY,
                parties?.filter((p: Party) => p.id !== party.id)
            )
        );
    };
}

export const StorageService = new StorageServiceSingleton();
