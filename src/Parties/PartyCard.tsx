import React from "react";
import { Card, Item } from "semantic-ui-react";
import { Party } from "./Party";
import { CharacterCard } from "../Tracker/CharacterCard";

type Props = {
    party: Party;
};

export class PartyCard extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render = () => (
        <Card>
            <Card.Header>{this.props.party.name}</Card.Header>
            <Card.Content>
                <Item.Group>
                    {this.props.party.characters.map((character) => (
                        <CharacterCard
                            size="small"
                            selected={false}
                            character={character}
                        ></CharacterCard>
                    ))}
                    <Item></Item>
                </Item.Group>
            </Card.Content>
            <Card.Meta>Last seen: {this.props.party.updated}</Card.Meta>
        </Card>
    );
}
