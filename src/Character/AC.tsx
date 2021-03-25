import React from "react";
import { EditableTrackerCell } from "../Tracker/EditableTrackerCell";

type Props = {
    value?: number
    name: string
    save$: Function
};

type State = Props;

export class AC extends React.Component<State, Props> {
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
            icon="shield"
        ></EditableTrackerCell>
    );
}
