import React from 'react';
const Test = (props) => {
  return (
    <div>
      test component
      <button
        onClick={() => {
          props.history.push('/');
        }}
      >
        history.push на глвную
      </button>
    </div>
  );
};

export default Test;
