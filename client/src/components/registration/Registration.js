import React, { useContext, useState } from 'react';
import './Registration.scss';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import { Context } from '../appchat/AppChat';

function Registration(props) {
  let history = useHistory();
  const [email, setEmail] = useState('iobox420@gmail.com');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password11, setPassword11] = useState('');
  const [password22, setPassword22] = useState('');
  const [informInput, setInformInput] = useState('');
  const { store } = useContext(Context);
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
  const onChangePassword1 = (e1) => {
    setPassword1(e1.target.value);
    let temp = '';
    let i = 0;
    do {
      temp = temp + '∗';
      i++;
    } while (temp.length < e1.target.value.length);
    setPassword11(temp);
  };

  const onChangePassword2 = (e2) => {
    setPassword2(e2.target.value);
    let temp = '';
    let i = 0;
    do {
      temp = temp + '∗';
      i++;
    } while (temp.length < e2.target.value.length);
    setPassword22(temp);
  };

  return (
    <Router>
      <div className="homepage">
        <h1 className="title">Enter your login and password to register</h1>
        <input
          placeholder="Input your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Input the password"
          value={password11}
          onChange={onChangePassword1}
        />
        <input
          placeholder="Input the password"
          value={password22}
          onChange={onChangePassword2}
        />
        <input
          type="text"
          className="errorPass"
          value={informInput}
          onChange={() => {}}
          style={errorStyle}
        />

        <button
          className="reg"
          onClick={() => {
            if (checkPass()) {
              console.log('send data...');
            }
          }}
        >
          Send
        </button>
        <Link to={`/websockets-chat/registration`}>
          <button
            className="reg"
            onClick={async () => {
              if (checkPass()) {
                show('Loading...', true);
                let result = await store.registration(email, password1);
                show(result, true);
                if (result === 'Sent registration link') {
                  history.push('/websockets-chat');
                }
              }
            }}
          >
            Registration
          </button>
          <button
            onClick={() => {
              console.log('push' + '');
              history.push('/test');
            }}
          >
            push
          </button>
        </Link>
      </div>
    </Router>
  );
}

export default Registration;
