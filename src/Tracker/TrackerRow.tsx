import React from "react";
import { Button, Table } from "semantic-ui-react";
import { AC, Avatar, CharacterType, Health } from "../Character";
import { EditableTrackerCell } from "./EditableTrackerCell";

type Props = {
    id: string;
    active: boolean;
    initiative$: Function;
} & CharacterType;

type State = {
    initiative: number;
    hp: number;
    ac: number;
    editting: boolean;
};
export class TrackerRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            initiative: this.props.initiative,
            hp: this.props.hp ?? 0,
            ac: this.props.ac ?? 0,
            editting: false,
        };
    }

    render = () => (
        <Table.Row textAlign="center" active={this.props.active}>
            <EditableTrackerCell
                value={this.props.initiative}
                save$={(value) =>
                    this.props.initiative$(this.props.name, value)
                }
                icon="recycle"
            ></EditableTrackerCell>
            <Table.Cell collapsing>
                <Avatar link={this.props.avatar} width={24}></Avatar>
                {this.props.name}
            </Table.Cell>
            <Table.Cell>
                <Health {...this.props} value={this.state.hp} save$={(value: number) => this.setState({hp: value})}></Health>
            </Table.Cell>
            <Table.Cell>
                <AC {...this.props} value={this.state.ac} save$={(value: number) => this.setState({ac: value})}></AC>
            </Table.Cell>
            <Table.Cell>
                <Button.Group size="small">
                    <Button color="black" icon="cog"></Button>
                    <Button color="red" icon="trash"></Button>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
}
