import Chat from './chat/Chat';

import Home from './home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import React, { createContext } from 'react';
import Store from './store/store';

const store = new Store();

export const Context = createContext({ store });

function Appmain(props) {
  return (
    <Context.Provider value={{ store }}>
      <React.Fragment>
        <Chat />
      </React.Fragment>
    </Context.Provider>
  );
}
function App() {
  return (
    <Context.Provider value={{ store }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/chat" component={Appmain} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
