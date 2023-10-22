import React from 'react';
import ButtonComponent from './components/ButtonComponent';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 700,
    }}>
        <ButtonComponent />
        <WebSocketComponent></WebSocketComponent>
    </div>
  );
}

export default App;
