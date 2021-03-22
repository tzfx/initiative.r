import { Container } from "semantic-ui-react";
import "./App.css";
import { Parties } from "./Parties/Parties";
import { PartyEditor } from "./Parties/PartyEditor";
import { TopHeader } from "./TopHeader/TopHeader";

import "semantic-ui-css/semantic.min.css";
import React from "react";
import { Party } from "./Parties/Party";
import { StorageService } from "./Storage/StorageService";
import { Tracker } from "./Tracker/Tracker";

type Props = {};

type State = {
    view: string;
    parties: Party[];
};

export class App extends React.Component<Props, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            view: "parties",
            parties: [],
        };
    }

    componentDidMount = () => {
        this.reloadParties();
    };

    handlePartyChange = () => this.reloadParties();

    reloadParties = () =>
        StorageService.getParties().then((parties) =>
            this.setState({ parties: parties ?? [] })
        );

    handleViewChange = (view: string) => {
        this.setState({ view });
    };

    render = () => (
        <div className="App">
            <Container>
                <TopHeader
                    state$={(v: string) => this.handleViewChange(v)}
                ></TopHeader>
                {this.state.view === "parties" ? (
                    <Parties
                        change$={() => this.handlePartyChange()}
                        state$={(v: string) => this.handleViewChange(v)}
                        parties={this.state.parties}
                    ></Parties>
                ) : this.state.view === "new-party" ? (
                    <PartyEditor
                        save$={(party: Party) =>
                            this.setState(
                                {
                                    parties: this.state.parties
                                        .filter((p) => p.id !== party.id)
                                        .concat(party),
                                },
                                () => this.setState({ view: "parties" })
                            )
                        }
                    ></PartyEditor>
                ) : this.state.view === "new-encounter" ? (
                    <Tracker characters={this.state.parties[0].characters ?? []}></Tracker>
                ) : (
                    <div></div>
                )}

                {/* <Tracker></Tracker> */}
            </Container>
        </div>
    );
}

export default App;
