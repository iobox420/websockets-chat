import React from "react";
import "./app.css";
// eslint-disable-next-line
import LongPulling from "./LongPulling";
// eslint-disable-next-line
import EventSourcing from "./EventSourcing";
import WebSock from "./WebSock";

function App() {
  return (
    <div>
      <WebSock />
    </div>
  );
}

export default App;
