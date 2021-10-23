import React from 'react';
import './Start.scss';
import { useHistory } from 'react-router-dom';
import Libton from '../libton/Libton';

function Homepage() {
  let history = useHistory();
  return (
    <div className="wrapper">
      <div className="homepage">
        <h1 className={'title'}>Andrey Frolov</h1>
        <Libton to={`/websockets-chat`} text={'Chat application'} />
      </div>
    </div>
  );
}

export default Homepage;
