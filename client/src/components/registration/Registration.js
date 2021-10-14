import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Registration.scss';
import { Context } from '../home/Home';
import Libton from '../libton/Libton';

const Registration = () => {
  let history = useHistory();
  const { store } = useContext(Context);

  const Push = () => {
    console.log('push' + '/websockets-chat');
    history.push('/websockets-chat');
  };

  const regButtonHandle = async () => {
    if (checkPass()) {
      show('Loading...', true);
      let result = await store.registration(email, password1);
      show(result, true);
      if (result === 'Send activation link again') {
        setTimeout(() => {
          history.push('/websockets-chat');
        }, 3000);
      }
    }
  };

  const [email, setEmail] = useState('iobox420@gmail.com');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [informInput, setInformInput] = useState('');
  const [errorStyle, setErrorStyle] = useState({});

  const checkPass = () => {
    setInformInput('Password mismatch');
    if (password1 !== password2) {
      setErrorStyle({ display: 'inherit' });
      console.log(" display: 'inherit' ");
      return false;
    }
    if (password1 === password2) {
      setErrorStyle({ display: 'none' });
      console.log("display: 'none'");
      return true;
    }
  };

  const show = (text, booleanShow) => {
    if (booleanShow) {
      setErrorStyle({ display: 'inherit' });
    }
    if (!booleanShow) {
      setErrorStyle({ display: 'none' });
    }
    setInformInput(text);
  };

  return (
    <div className="wrapper">
      <div className="homepage">
        <h1 className="title">Enter your login and password to register</h1>
        <input
          type="email"
          name="email"
          placeholder="Input your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Input the password"
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Input the password"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <input
          type="text"
          className="errorPass"
          value={informInput}
          onChange={() => {}}
          style={errorStyle}
        />
        <Libton
          to={`/websockets-chat/registration`}
          className="reg"
          onClick={regButtonHandle}
          text={'Registration'}
        />
        <button className="reg" onClick={Push}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Registration;
