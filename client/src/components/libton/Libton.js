import React from 'react';
import { Link } from 'react-router-dom';
const Libton = ({ to, className, text, onClick }) => {
  return (
    <Link to={to}>
      <button onClick={onClick} className={className}>
        {text}
      </button>
    </Link>
  );
};

export default Libton;
