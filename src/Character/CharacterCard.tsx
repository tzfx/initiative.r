import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-human-sprites";
import React from "react";
import {
    Button,
    Card,
    Divider,
    Form,
    Icon,
    InputOnChangeData,
} from "semantic-ui-react";
import { CharacterType } from "./Character";
import { uuid58 } from "uuid-base58";

type Props = {
    character: CharacterType;
    selected?: boolean;
    size?: "small" | "large";
    onSave?: Function;
    onCancel?: Function;
    new?: boolean;
};

type State = {
    edits: CharacterType;
    editting: boolean;
    showAdvanced: boolean;
    avatar?: string;
} & Props;

export class CharacterCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editting: props.new ?? false,
            edits: this.props.character,
            avatar: props.new ? uuid58() : this.props.character.avatar,
            showAdvanced: false,
            ...props,
        };
    }

    componentDidMount() {
        this.setState({
            character: { ...this.state.character, avatar: this.state.avatar }
        }, () => this.setState({edits: this.state.character}));
    }

    handleChange = (event: React.ChangeEvent, data: InputOnChangeData) => {
        const { name, value } = data;
        this.setState({
            edits: {
                ...this.state.character,
                ...this.state.edits,
                [name]: value,
            },
        });
    };

    setAvatar = () => {
        const seed = uuid58();
        this.handleChange(null as any, { name: "avatar", value: seed } as any);
    };

    doSave = () => {
        this.setState(
            {   
                editting: false,
                character: { ...this.state.character, ...this.state.edits },
            },
            () => {
                if (this.props.onSave) this.props.onSave(this.state.character);
            }
        );
    };

    doCancel = () => {
        this.setState(
            {
                editting: false,
            },
            () => {
                if (this.props.onCancel) this.props.onCancel();
            }
        );
    };

    toggleSkip = () =>
        this.setState({
            character: {
                ...this.state.character,
                skip: !this.state.character.skip,
            },
        });

    render = () => (
        <Card
            raised={this.state.selected}
            color={
                this.state.selected
                    ? "green"
                    : this.state.character.skip
                    ? "red"
                    : undefined
            }
        >
            {this.state.editting ? (
                <Card.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: new Avatars(sprites, {
                                            width: 64,
                                        }).create(this.state.edits.avatar),
                                    }}
                                ></p>
                                <span
                                    style={{
                                        color: "gray",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    <small>{this.state.edits.avatar}</small>
                                    &nbsp;
                                    <Icon
                                        size="small"
                                        name="refresh"
                                        onClick={this.setAvatar}
                                    ></Icon>
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    labelPosition="left"
                                    label="Name"
                                    name="name"
                                    onChange={this.handleChange}
                                    type="text"
                                    value={this.state.edits.name}
                                ></Form.Input>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    type="number"
                                    min={0}
                                    labelPosition="left"
                                    label="Initiative"
                                    name="initiative"
                                    onChange={this.handleChange}
                                    value={this.state.edits.initiative}
                                ></Form.Input>
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <Form.Checkbox
                                onClick={() =>
                                    this.setState({
                                        showAdvanced: !this.state.showAdvanced,
                                    })
                                }
                                label="Show Advanced"
                                checked={this.state.showAdvanced}
                            ></Form.Checkbox>
                        </Form.Field>
                        {this.state.showAdvanced ? (
                            <div>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min={1}
                                            labelPosition="left"
                                            label="Hit Points"
                                            value={this.state.edits.hp}
                                            onChange={this.handleChange}
                                        ></Form.Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min={1}
                                            labelPosition="left"
                                            label="Armor Class"
                                            value={this.state.edits.ac}
                                            onChange={this.handleChange}
                                        ></Form.Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min={1}
                                            labelPosition="left"
                                            label="Spell Save DC"
                                            value={this.state.edits.ssDC}
                                            onChange={this.handleChange}
                                        ></Form.Input>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <Form.Checkbox
                                        onClick={this.toggleSkip}
                                        label="Skip this character during turn progression"
                                        checked={this.state.edits.skip}
                                    ></Form.Checkbox>
                                </Form.Field>
                            </div>
                        ) : (
                            ""
                        )}
                        <Divider></Divider>
                        <Form.Group>
                            <Form.Button color="blue" onClick={this.doSave}>
                                Save
                            </Form.Button>
                            <Form.Button secondary>Reset</Form.Button>
                            <Form.Button color="red" onClick={this.doCancel}>
                                Cancel
                            </Form.Button>
                        </Form.Group>
                    </Form>
                </Card.Content>
            ) : (
                <Card.Content>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: new Avatars(sprites, {
                                width: 64,
                            }).create(this.state.character.avatar),
                        }}
                    ></p>
                    <Card.Header>{this.state.character.name}</Card.Header>
                    <Card.Meta>
                        Initiative: {this.state.character.initiative}
                    </Card.Meta>
                    <Button
                        icon="cog"
                        size="small"
                        onClick={() => this.setState({ editting: true })}
                    ></Button>
                </Card.Content>
            )}
        </Card>
    );
}
