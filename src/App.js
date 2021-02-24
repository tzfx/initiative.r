import { Container} from 'semantic-ui-react';
import './App.css';
import { Tracker } from './Tracker/Tracker';
import { Parties } from './Parties/Parties';
import { TopHeader } from './TopHeader/TopHeader';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <Container>
        <TopHeader state$={(s) => console.log(s)}></TopHeader>
        <Parties state$={(s) => console.log(s)} parties={[]}></Parties>
        {/* <Tracker></Tracker> */}
      </Container>
    </div>
  );
}

export default App;
