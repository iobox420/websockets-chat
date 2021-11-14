import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Start from '../start/Start';
import Home from '../home/Home';
import Registration from '../registration/Registration';
import Chat from '../chat/Chat';

function MainPage() {
  return (
    <div className="wrapper">
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/websockets-chat" exact component={Home} />

        <Route
          path="/websockets-chat/registration"
          exact
          component={Registration}
        />
        <Route path="/websockets-chat/chat" exact component={Chat} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default MainPage;
