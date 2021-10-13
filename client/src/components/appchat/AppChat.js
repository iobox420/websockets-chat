import Chat from '../chat/Chat';
import Home from '../home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import React, { createContext } from 'react';
import store from '../../store/store';
import Registration from '../registration/Registration';

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

function TestR(props) {
  return (
    <div>
      форма регистрации
      <button
        onClick={() => {
          props.history.push('/test');
        }}
      >
        {' '}
        на test
      </button>
    </div>
  );
}

function AppChat(props) {
  return (
    <Context.Provider value={{ store }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/websockets-chat" exact>
              <Home history={props.history} />
              {/**/}

              {/*              <button
                onClick={() => {
                  props.history.push('/test');
                }}
                className="reg"
              >
                Registration1
              </button>*/}

              {/**/}
            </Route>

            <Route
              path="/websockets-chat/registration"
              component={TestR}
              history={props.history}
            />

            <Route
              path="/websockets-chat/chat"
              component={Appmain}
              history={props.history}
            />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default AppChat;
