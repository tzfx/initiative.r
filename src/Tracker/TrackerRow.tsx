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
    editting: boolean;
};
export class TrackerRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            initiative: this.props.initiative,
            editting: false,
        };
    }

    render = () => (
        <Table.Row active={this.props.active}>
            <EditableTrackerCell value={this.props.initiative} save$={(value) => this.props.initiative$(this.props.name, value)}></EditableTrackerCell>
            <Table.Cell collapsing>
                <Avatar link={this.props.avatar} width={24}></Avatar>
                {this.props.name}
            </Table.Cell>
            <Table.Cell>
                <Health {...this.props}></Health>
            </Table.Cell>
            <Table.Cell>
                <AC {...this.props}></AC>
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
