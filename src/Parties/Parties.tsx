import React from "react";
import { Button, Card, Divider } from "semantic-ui-react";
import { StorageService } from "../Storage/StorageService";
import { Party } from "./Party";
import { PartyCard } from "./PartyCard";

type Props = {
    parties: Party[];
    state$: Function;
    change$: Function;
};

export class Parties extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    onDelete$ = (party: Party) => StorageService.deleteParty(party).then(() => this.props.change$());

    render = () => (
        <Card.Group centered itemsPerRow={1}>
            {this.props.parties.length > 0 ? (
                this.props.parties.map((party) => (
                    <PartyCard
                        delete$={(party: Party) => this.onDelete$(party)}
                        key={party.id}
                        party={party}
                    ></PartyCard>
                ))
            ) : (
                <Card>
                    <Card.Content>
                        It appears you have no parties! Maybe you should find
                        some friends...
                        <Divider></Divider>
                        <Button onClick={() => this.props.state$("new-party")}>
                            Start a new party
                        </Button>
                        <Button>Import a party</Button>
                    </Card.Content>
                </Card>
            )}
        </Card.Group>
    );
}
