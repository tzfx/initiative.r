import React from "react";
import { Table, Popup, Button, Input, SemanticICONS, Icon } from "semantic-ui-react";

type Value = number | string | "N/A";

type Props = {
    value: Value;
    icon?: SemanticICONS;
    save$: (value: Value) => void;
};

type State = {
    value: Value;
    editting: boolean;
};

export class EditableTrackerCell extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
            editting: false
        }
    }
    
    render = () => (
        <Table.Cell collapsing textAlign="center">
            <Popup
                hoverable
                open={this.state.editting}
                on="click"
                trigger={
                        <Button
                            basic
                            icon
                            labelPosition="right"
                            onClick={() => this.setState({ editting: true })}
                        >
                            {this.props.value}
                            <Icon name={this.props.icon}></Icon>
                        </Button>
                }
            >
                <Input
                    type="number"
                    defaultValue={this.props.value}
                    onChange={(e, d) => this.setState({ value: d.value })}
                ></Input>
                <Button
                    floated="right"
                    icon="check"
                    onClick={() => {
                        this.setState(
                            {
                                editting: false,
                            },
                            () => this.props.save$(this.state.value)
                        );
                    }}
                />
            </Popup>
        </Table.Cell>
    );
}
