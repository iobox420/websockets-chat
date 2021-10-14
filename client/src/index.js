import MainPage from './components/mainpage/MainPage';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <MainPage />
  </Router>,
  document.getElementById('root')
);
