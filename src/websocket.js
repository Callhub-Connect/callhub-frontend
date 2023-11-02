
import { Client } from '@stomp/stompjs';
import websocket from 'websocket';

Object.assign(global, { WebSocket: websocket.w3cwebsocket })

const client = new Client({
  brokerURL: 'ws://localhost:8080/mywebsockets',
  onConnect: () => {
    client.subscribe('/topic/messages', message =>
      console.log(`Received: ${message.body}`)
    );

    client.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    }
    
    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    client.publish({ destination: '/app/message', body: 'First Message' });
  },
});

export function connect(){ 
    client.activate();
}

export function disconnect(){
    client.deactivate()
    console.log("websocket disconnected");
}

