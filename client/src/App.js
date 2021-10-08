import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import React, { createContext } from 'react';
import store from './store/store';

export const Context = createContext({ store });

function Appmain() {
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
