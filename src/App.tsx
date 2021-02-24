import { Container} from 'semantic-ui-react';
import './App.css';
import { Tracker } from './Tracker/Tracker';
import { Parties } from './Parties/Parties';
import {PartyEditor } from './Parties/PartyEditor';
import { TopHeader } from './TopHeader/TopHeader';

import 'semantic-ui-css/semantic.min.css'
import React from 'react';

type Props = {}

type State = {
  view: string
};

export class App extends React.Component<Props,State> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      view: "parties"
    }
  }
  
  handleViewChange = (view: string) => {
    this.setState({view});
  }
  
  render = () => (
    <div className="App">
      <Container>
        <TopHeader state$={(s: string) => console.log(s)}></TopHeader>
        { 
          this.state.view === "parties" ?
            (<Parties state$={(v: string) => this.handleViewChange(v)} parties={[]}></Parties>) :
          this.state.view === "new-party" ?
            (<PartyEditor></PartyEditor>) : (<div></div>)
        }
        
        {/* <Tracker></Tracker> */}
      </Container>
    </div>
  );
}

export default App;
