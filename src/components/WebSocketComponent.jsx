import React, { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  function connect() {
    var socket = new SockJS('/greetings');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe('/user/queue/greetings', function (greeting) {
        showGreeting(JSON.parse(greeting.body).name);
      });
    });
   }
   
   function sendName() {
    stompClient.send("/app/greetings", {}, $("#name").val());
   }

  return (
    <div>
      {/* Your component's content */}
    </div>
  );
};

export default WebSocketComponent;
