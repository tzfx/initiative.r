import React from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { Character } from "../Character/Character";
import { CharacterCard } from "../Character/CharacterCard";
import { Party } from "./Party";
import { PartyMetadata } from "./PartyMetadata";
import { StorageService } from "../Storage/StorageService";

type Props = {
    party?: Party;
    save$: (state: State) => void;
};

type State = {
    adding: boolean;
} & Party;

export class PartyEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const party = this.props.party ?? new Party();
        this.state = {
            adding: false,
            ...party,
        };
    }
    
    handlePartyMetaUpdate = (name: string) => {
        this.setState({
            name
        });
    }

    handleCharacterSave = (character: Character) => {
        this.setState(
            {
                characters: this.state.characters
                    .filter((c) => c.avatar !== character.avatar)
                    .concat(character),
                adding: false,
            },
            () => StorageService.saveParty({ ...this.state })
        );
    };

    handleCharacterCancel = () => {
        this.setState({
            adding: false,
        });
    };

    render = () => (
        <Card.Group centered itemsPerRow={1}>
            <PartyMetadata updateName$={this.handlePartyMetaUpdate} {...this.state}></PartyMetadata>
            <Button
                disabled={this.state.adding}
                onClick={() => this.setState({ adding: true })}
                icon
                labelPosition="left"
            >
                <Icon name="add square"></Icon>Add a new character
            </Button>
            <Button
                disabled={this.state.adding}
                onClick={() => this.props.save$(this.state)}
                icon
                labelPosition="right"
            >
                <Icon name="save"></Icon>Save Party
            </Button>
            {this.state.adding ? (
                <CharacterCard
                    onCancel={this.handleCharacterCancel}
                    onSave={this.handleCharacterSave}
                    new
                    character={new Character()}
                ></CharacterCard>
            ) : (
                ""
            )}
            {this.state.characters
                .sort((a, b) => b.initiative - a.initiative)
                .map((char) => (
                    <CharacterCard
                        key={char.name}
                        onSave={this.handleCharacterSave}
                        character={char}
                    ></CharacterCard>
                ))}
        </Card.Group>
    );
}
