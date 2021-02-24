import React from "react";
import { Button, Card, Icon, List } from "semantic-ui-react";
import { Character, CharacterType } from "../Character/Character";
import { CharacterCard } from "../Character/CharacterCard";
import { NewParty, Party } from "./Party";
import { PartyMetadata } from "./PartyMetadata";

type Props = {
    party?: Party;
};

type State = {
    adding: boolean;
} & Party;

export class PartyEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const party = this.props.party ?? NewParty;
        this.state = {
            adding: false,
            ...party
        };
    }

    handleSave = (character: Character) => {
        this.setState({
            characters: this.state.characters.concat(character),
            adding: false,
        });
    };

    handleCancel = () => {
        this.setState({
            adding: false,
        });
    };

    render = () => (
        <Card.Group centered itemsPerRow={1}>
            <PartyMetadata {...this.state}></PartyMetadata>
            <Button
                disabled={this.state.adding}
                onClick={() => this.setState({ adding: true })}
                icon
                labelPosition="left"
            >
                <Icon name="add square"></Icon>Add a new character
            </Button>
            {this.state.adding ? (
                <CharacterCard
                    onCancel={this.handleCancel}
                    onSave={this.handleSave}
                    new
                    character={new Character()}
                ></CharacterCard>
            ) : (
                ""
            )}
            {this.state.characters
                .sort((a, b) => b.initiative - a.initiative)
                .map((char, i) => (
                    <CharacterCard
                        key={char.name}
                        onSave={this.handleSave}
                        character={char}
                    ></CharacterCard>
                ))}
        </Card.Group>
    );
}
