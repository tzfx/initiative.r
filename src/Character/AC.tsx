import React from "react";
import { Icon } from "semantic-ui-react";

type Props = {
    ac?: number
};

type State = Props;

export class AC extends React.Component<State, Props> {
    private NA = "N/A";

    hasData = () => this.props.ac != null;

    constructor(props: Props) {
        super(props);
        this.state = {
            ...props,
        };
    }

    render = () => (
        <div>
            {this.hasData() ? this.props.ac : this.NA}
            <Icon name="shield"></Icon>
        </div>
    );
}
