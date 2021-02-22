import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-human-sprites";
import React from "react";
import {
    Card,
    Divider,
    Form,
    Icon,
    Image,
    InputOnChangeData,
} from "semantic-ui-react";
import { Character, CharacterType } from "../Character/Character";
import { uuid58 } from "uuid-base58";

type Props = {
    character: CharacterType;
    selected: boolean;
    onSave?: Function;
    onCancel?: Function;
    new?: boolean;
};

type State = {
    editting: boolean;
    showAdvanced: boolean;
    avatar?: string;
} & Props;

export class CharacterCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editting: props.new ?? false,
            avatar: props.new
                ? uuid58()
                : this.props.character.avatar,
            showAdvanced: false,
            ...props,
        };
    }
    
    componentDidMount() {
        this.setState({
            character: { ...this.state.character, avatar: this.state.avatar },
        });
    }

    handleChange = (event: React.ChangeEvent, data: InputOnChangeData) => {
        const { name, value } = data;
        this.setState({
            character: { ...this.state.character, [name]: value },
        });
    };

    setAvatar = () => {
        const seed = uuid58();
        this.setState({ avatar: seed }, () => {
            this.setState({
                character: { ...this.state.character, avatar: seed },
            });
        });
    };

    doSave() {
        if (this.props.onSave) this.props.onSave(this.state.character);
    }

    doCancel() {
        if (this.props.onCancel) this.props.onCancel();
    }

    toggleSkip = () =>
        this.setState({
            character: (this.state.character as Character).setSkip(
                !this.state.character.skip
            ),
        });

    render = () => (
        <Card raised={this.state.selected} color={this.state.selected ? "green" : this.state.character.skip ? "red" : undefined}>
            {this.state.editting ? (
                <Card.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: new Avatars(sprites, {
                                            width: 64,
                                        }).create(this.state.avatar),
                                    }}
                                ></p>
                                <span
                                    style={{
                                        color: "gray",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    <small>{this.state.avatar}</small>
                                    &nbsp;
                                    <Icon
                                        size="small"
                                        name="refresh"
                                        onClick={() => this.setAvatar()}
                                    ></Icon>
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    labelPosition="left"
                                    label="Name"
                                    name="name"
                                    onChange={this.handleChange}
                                ></Form.Input>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    type="number"
                                    min={1}
                                    labelPosition="left"
                                    label="Initiative"
                                    name="initiative"
                                    onChange={this.handleChange}
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
                                        ></Form.Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min={1}
                                            labelPosition="left"
                                            label="Armor Class"
                                        ></Form.Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min={1}
                                            labelPosition="left"
                                            label="Spell Save DC"
                                        ></Form.Input>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <Form.Checkbox
                                        onClick={this.toggleSkip}
                                        label="Skip this character during turn progression"
                                        checked={this.state.character.skip}
                                    ></Form.Checkbox>
                                </Form.Field>
                            </div>
                        ) : (
                            ""
                        )}
                        <Divider></Divider>
                        <Form.Group>
                            <Form.Button
                                color="blue"
                                onClick={() => this.doSave()}
                            >
                                Save
                            </Form.Button>
                            <Form.Button secondary>Reset</Form.Button>
                            <Form.Button color="red" onClick={() => this.doCancel()}>
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
                </Card.Content>
            )}
        </Card>
    );
}
