import React, { useContext, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { Context } from '../../App';

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
      <Link to={`/chat`}>
        <button onClick={() => store.login(email, password)}>Login</button>
      </Link>
      <button onClick={() => store.registration(email, password)}>
        Регистрация
      </button>
    </div>
  );
}

export default Homepage;
