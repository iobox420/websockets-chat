import AppChat from '../appchat/AppChat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import React from 'react';
import Test from '../test/Test';

function App() {
  let history = useHistory();
  return (
    <Router>
      <div className="App">
        main page
        {/*

        */}
        <Switch>
          <Route path="/" exact />
          <Route
            path="/websockets-chat"
            component={AppChat}
            history={history}
          />{' '}
          <Route path="/test" component={Test} history={history} />
          <Redirect to="/websockets-chat" />
        </Switch>
        {/*

        */}
        <Link to={`/websockets-chat`}>
          <button>websockets-chat</button>
        </Link>
        <Link to={`/test`}>
          <button>test</button>
        </Link>
        {/*

        */}
      </div>
    </Router>
  );
}

export default App;
