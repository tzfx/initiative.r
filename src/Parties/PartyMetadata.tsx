import React from "react";
import { Card, Form, Icon } from "semantic-ui-react";
import { Party } from "./Party";

type Props = {
    updateName$: (update: string) => void
} & Party;

type State = {
    editting: boolean;
    name: string;
    edits: string;
};

export class PartyMetadata extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editting: false,
            name: this.props.name,
            edits: this.props.name
        };
    }
    
    saveName = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        this.props.updateName$(this.state.name);
        this.setState({name: this.state.edits, editting: false});
    }
    
    updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            edits: event.target.value
        });
    }

    render = () => (
        <Card>
            {!this.state.editting ? (
                <Card.Header as="h2">
                    {this.state.name}
                    <Icon
                        onClick={() => this.setState({ editting: true })}
                        name="pen square"
                        size="small"
                    ></Icon>
                </Card.Header>
            ) : (
                <Card.Header>
                    <Form>
                        <Form.Group>
                            <Form.Input
                                size="small"
                                label="Party Name: "
                                labelPosition="left"
                                value={this.state.edits}
                                onChange={(e) => this.updateName(e)}
                            ></Form.Input>
                            <Form.Button
                                onClick={(e) => this.saveName(e)}
                                size="small"
                                icon="check circle"
                            ></Form.Button>
                            <Form.Button
                                onClick={() => this.setState({editting: false})}
                                size="small"
                                icon="x"
                            ></Form.Button>
                        </Form.Group>
                    </Form>
                </Card.Header>
            )}
            <Card.Description>"{this.props.description}"</Card.Description>
            <Card.Meta textAlign="right">{this.props.id}</Card.Meta>
        </Card>
    );
}
