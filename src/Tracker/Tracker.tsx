import React from "react";
import { Button, Card, Icon, List } from "semantic-ui-react";
import { Character } from "../Character/Character";
import { CharacterCard } from "../Character/CharacterCard";

type Props = {};

type State = {
  characters: Character[];
  active: number;
  adding: boolean;
};

export class Tracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: 0,
      adding: false,
      characters: []
    };
  }

  next = () => {
    this.setState({
      active:
        this.state.active + 1 < this.state.characters.length
          ? this.state.active + 1
          : 0
    });
  };

  prev = () => {
    this.setState({
      active:
        this.state.active - 1 >= 0
          ? this.state.active - 1
          : this.state.characters.length - 1
    });
  };

  handleSave = (character: Character) => {
    this.setState({
      characters: this.state.characters.concat(character),
      adding: false
    });
  };

  handleCancel = () => {
    this.setState({
      adding: false
    });
  };

  render = () => (
    <Card.Group centered itemsPerRow={1}>
      <Card>
        <Card.Content>
          <Button onClick={() => this.prev()}>&lt;&lt; Previous</Button>
          <Button onClick={() => this.next()}>Next &gt;&gt;</Button>
        </Card.Content>
      </Card>
      {this.state.characters
        .sort((a, b) => b.initiative - a.initiative)
        .map((char, i) => (
          <CharacterCard
            key={char.name}
            onSave={this.handleSave}
            selected={this.state.active === i}
            character={char}
          ></CharacterCard>
        ))}
      {this.state.adding ? (
        <CharacterCard
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          selected={false}
          new
          character={new Character()}
        ></CharacterCard>
      ) : (
        ""
      )}
      <Button
        disabled={this.state.adding}
        onClick={() => this.setState({ adding: true })}
        icon
        labelPosition="left"
      >
        <Icon name="add square"></Icon>Add a new character
      </Button>
    </Card.Group>
  );
}
