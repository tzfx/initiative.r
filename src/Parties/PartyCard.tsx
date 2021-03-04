import React from "react";
import { Button, Card, Item } from "semantic-ui-react";
import { Party } from "./Party";
import { CharacterCard } from "../Character/CharacterCard";
import { DateTime } from "luxon";
import { Encounter } from "../Encounter/Encounter";

type Props = {
  delete$: Function,
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
        <Card.Group
          itemsPerRow={
            this.props.party.characters.length > 16
              ? 16
              : this.props.party.characters.length === 0
              ? 1
              : (this.props.party.characters.length as any)
          }
        >
          {this.props.party.characters.map((character) => (
            <CharacterCard
              key={character.avatar}
              size="small"
              selected={false}
              character={character}
            ></CharacterCard>
          ))}
          <Item></Item>
        </Card.Group>

        <Item.Group>
          <Item>
            {this.props.party.encounters.find((e: Encounter) => e.active) !=
            null ? (
              <Button icon="play" label="Resume Encounter"></Button>
            ) : (
              <Button icon="hourglass start" label="New Encounter"></Button>
            )}
          </Item>
          <Item>
            <Button icon="trash" label="Delete Party" onClick={() => this.props.delete$(this.props.party)}></Button>
          </Item>
        </Item.Group>
      </Card.Content>

      <Card.Meta>
        Last seen: {DateTime.fromJSDate(this.props.party.updated).toRelative()}
      </Card.Meta>
    </Card>
  );
}
