import React from "react";
import { Card, Form, Icon } from "semantic-ui-react";
import { Party } from "./Party";

type Props = Party;

type State = {
    editting: boolean;
    name: string;
};

export class PartyMetadata extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editting: false,
            name: this.props.name,
        };
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
                            ></Form.Input>
                            <Form.Button
                                size="small"
                                icon="check circle"
                            ></Form.Button>
                            <Form.Button
                                size="small"
                                icon="x circle"
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
