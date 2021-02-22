import { Container, Header } from 'semantic-ui-react';
import './App.css';
import { Tracker } from './Tracker/Tracker';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <Container>
        <Header as="h1">Initiative Tracker</Header>
        <Tracker></Tracker>
      </Container>
    </div>
  );
}

export default App;
