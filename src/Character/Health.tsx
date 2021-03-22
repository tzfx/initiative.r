import React from "react";
import { Icon } from "semantic-ui-react";

type Props = {
    hp?: number;
    maxhp?: number;
};

type State = Props;

export class Health extends React.Component<State, Props> {
    private NA = "N/A";

    hasData = () => this.props.hp != null && this.props.maxhp != null;

    constructor(props: Props) {
        super(props);
        this.state = {
            ...props,
        };
    }

    render = () => (
        <div>
            {this.hasData() ? this.state.hp + "/" + this.state.maxhp : this.NA}
            <Icon name="heart"></Icon>
        </div>
    );
}
