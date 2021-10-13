import React, { useContext, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { Context } from '../appchat/AppChat';

function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="Input your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Input the password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to={`/websockets-chat/chat`}>
        <button onClick={() => store.login(email, password)}>Login</button>
      </Link>
      <Link to={`/websockets-chat/registration`}>
        <button
          className="reg"
          /*onClick={() => store.registration(email, password)}*/
        >
          Registration
        </button>
      </Link>
    </div>
  );
}

export default Homepage;
