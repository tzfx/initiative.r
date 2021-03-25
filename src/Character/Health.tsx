import React from "react";
import { EditableTrackerCell } from "../Tracker/EditableTrackerCell";

type Props = {
    name: string;
    value?: number;
    save$: Function;
};

type State = Props;

export class Health extends React.Component<State, Props> {
    private NA = "N/A";

    constructor(props: Props) {
        super(props);
        this.state = {
            ...props,
        };
    }

    render = () => (
        <EditableTrackerCell
            value={this.props.value ?? this.NA }
            save$={(value) => this.props.save$(value)}
            icon="heart"
        ></EditableTrackerCell>
    );
}
