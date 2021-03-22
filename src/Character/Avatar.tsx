import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-human-sprites";
import React from "react";
import { uuid58 } from "uuid-base58";

type Props = {
    width?: number;
    link?: string;
    showValue?: boolean;
};

type State = Props;

export class Avatar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            link: props.link ?? uuid58(),
            width: props.width ?? 64,
            showValue: props.showValue ?? false,
        };
    }

    generate = () => (
        <p
            // This is required because Avatars.create generates an SVG string.
            dangerouslySetInnerHTML={{
                __html: new Avatars(sprites, {
                    width: this.state.width,
                }).create(this.state.link),
            }}
        ></p>
    );

    render = () => (
        <div>
            {this.generate()}
            {this.state.showValue ? (
                <span
                    style={{
                        color: "gray",
                        fontFamily: "monospace",
                    }}
                >
                    <small>{this.state.link}</small>
                </span>
            ) : (
                ""
            )}
        </div>
    );
}
