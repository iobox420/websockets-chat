import AppChat from '../appchat/AppChat';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import Test from '../test/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Link to={`/websockets-chat`}>
              <button>websockets-chat</button>
            </Link>
            <Link to={`/test`}>
              <button>test</button>
            </Link>
          </Route>
          <Route path="/websockets-chat" component={AppChat} />
          <Route path="/test" component={Test} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
