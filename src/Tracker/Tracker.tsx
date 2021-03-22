import React from "react";
import { Button, Card, Icon, Table } from "semantic-ui-react";
import { Character, CharacterType } from "../Character";
import { TrackerRow } from "./TrackerRow";
import { Encounter } from "../Encounter/Encounter";

type Props = {
    characters: CharacterType[];
};

type State = {
    encounter: Encounter;
    characters: CharacterType[];
    active: number;
    adding: boolean;
    columns: {
        [field: string]: boolean;
    };
};

export class Tracker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            encounter: {} as any,
            active: 0,
            adding: false,
            characters: props.characters.sort(Character.sort),
            columns: {
                hp: true,
                ac: true,
            },
        };
    }

    next = () => {
        this.setState({
            active:
                this.state.active + 1 < this.state.characters.length
                    ? this.state.active + 1
                    : 0,
        });
    };

    prev = () => {
        this.setState({
            active:
                this.state.active - 1 >= 0
                    ? this.state.active - 1
                    : this.state.characters.length - 1,
        });
    };

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

    visibleColumns = () =>
        Object.entries(this.state.columns).filter(([_, v]) => v);

    updateInit = (id: string, init: number = 0) => {
        const i = this.props.characters.findIndex((c) => c.name === id);
        if (i > -1 && this.props.characters[i].initiative !== init) {
            const characters = this.props.characters;
            characters[i].initiative = init;
            this.setState({
                characters: characters.sort(Character.sort),
            });
        }
    };

    render = () => (
        <Card.Group centered itemsPerRow={1}>
            <Card>
                <Card.Content>
                    <Button onClick={() => this.prev()}>
                        &lt;&lt; Previous
                    </Button>
                    <Button onClick={() => this.next()}>Next &gt;&gt;</Button>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Table celled>
                        <Table.Header>
                            <Table.HeaderCell>INITIATIVE</Table.HeaderCell>
                            <Table.HeaderCell>NAME</Table.HeaderCell>
                            {this.visibleColumns().map(([key]) => (
                                <Table.HeaderCell key={key}>
                                    {key.toUpperCase()}
                                </Table.HeaderCell>
                            ))}
                            <Table.HeaderCell collapsing textAlign="center">
                                <Icon name="ellipsis horizontal"></Icon>
                            </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {this.state.characters.map((c, i) => (
                                <TrackerRow
                                    key={c.avatar}
                                    initiative$={(
                                        id: string,
                                        init: number
                                    ) => this.updateInit(id, init)}
                                    active={this.state.active === i}
                                    id={c.name}
                                    {...c}
                                ></TrackerRow>
                            ))}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}
