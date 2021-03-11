import React from "react";
import { Button, Card, Header, Icon, Item, Modal } from "semantic-ui-react";
import { Party } from "./Party";
import { CharacterCard } from "../Character/CharacterCard";
import { DateTime } from "luxon";
import { Encounter } from "../Encounter/Encounter";

type Props = {
  delete$: (party: Party) => void,
  party: Party;
};

type State = {
  deleteModalOpen: boolean
}

export class PartyCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      deleteModalOpen: false
    }
  }
  
  doDelete = () => {
    this.props.delete$(this.props.party);
    this.setState(
      {
        deleteModalOpen: false
      }
    )
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
            <Modal open={this.state.deleteModalOpen} basic size="small" trigger={<Button icon="trash" label="Delete Party" onClick={()=>this.setState({deleteModalOpen: true})}></Button>}>
              <Header>
                <Icon name="trash"></Icon>
                Delete {this.props.party.name}?
              </Header>
              <Modal.Content>
                <p>
                  Are you sure you want to delete this party? This action cannot be undone.
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button icon="trash" secondary inverted basic onClick={() => this.setState({deleteModalOpen: false})}>Cancel</Button>
                <Button icon="trash" color="red" onClick={() => this.doDelete()}>Delete</Button>
              </Modal.Actions>
            </Modal>
          </Item>
        </Item.Group>
      </Card.Content>

      <Card.Meta>
        Last seen: {DateTime.fromJSDate(this.props.party.updated).toRelative()}
      </Card.Meta>
    </Card>
  );
}
