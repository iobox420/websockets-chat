import React, { createContext, useContext, useState } from 'react';
import './Home.scss';
import store from '../../store/store';
import Libton from '../libton/Libton';
import { useHistory } from 'react-router-dom';

export const Context = createContext({ store });

function Homepage() {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState({});

  const { store } = useContext(Context);

  const loginHandle = async () => {
    let msg = await store.login(email, password);
    switch (msg.type) {
      case 'error':
        console.log('error login clg');
        console.log(msg);
        setError(msg.message);
        setErrorStyle({ display: 'inherit' });

        break;
      case 'responce':
        if (msg.responce.status === 200) {
          console.log(msg);
          console.log('responce clg');
          setError('Login succefull');
          setErrorStyle({ display: 'inherit', color: '#24ca21' });
          setTimeout(() => {
            history.push('/websockets-chat/chat');
          }, 1000);
        }
        break;
    }
  };

  return (
    <Context.Provider value={{ store }}>
      <React.Fragment>
        <div className="homepage">
          <h1>Welcome to ChatApp</h1>
          <input
            placeholder="Input your email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Input the password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="errorPass"
            value={error}
            onChange={() => {}}
            style={errorStyle}
          />
          <button onClick={loginHandle}>Login</button>
          <Libton to={`/websockets-chat/registration`} text={'Registration'} />
          <Libton className="reg" to={`/`} text={'Back'} />
        </div>
      </React.Fragment>
    </Context.Provider>
  );
}

export default Homepage;
