import { Client } from "@stomp/stompjs";
import websocket from "websocket";
import Observable from './observable';

Object.assign(global, { WebSocket: websocket.w3cwebsocket });

var client;
var role;
var sessionId;

// Create an observable instance
const messageObservable = new Observable();

export function connectWebsocket(userRole, sessionID) {
  role = userRole;
  sessionId = sessionID;

  client = new Client({
    brokerURL: "ws://localhost:8080/callhub",
    onConnect: () => {
      // subscribe to messages
      client.subscribe(`/topic/message-${role}/${sessionId}`, (message) => {
        // Notify observers when a new message arrives
        messageObservable.notifyObservers(message.body);
      });

      // subscribe to end session notifications
      client.subscribe(`/topic/end-session-${role}/${sessionId}`, (message) => {
        // TODO: respond to end session notification arrives
        
      });

      client.onWebSocketError = (error) => {
        console.error("Error with websocket", error);
      };

      client.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };

      console.log("connected to websocket");
    },
  });
  client.activate();
}

export function disconnectWebsocket() {
  // Check if the client is defined before calling deactivate
  if (client) {
    client.deactivate();
    console.log("websocket disconnected");
  }
}

export function sendMessageWebsocket(message) {
  client.publish({
    destination: `/app/message-${role}/${sessionId}`,
    body: message,
  });
}

export function endSessionWebsocket(){
  client.publish({
    destination: `/app/end-session-${role}/${sessionId}`,
  });
}

// Function to subscribe to WebSocket messages in the Chat component
export function subscribeToMessages(callback) {
  messageObservable.addObserver(callback);
}

// Function to unsubscribe from WebSocket messages in the Chat component
export function unsubscribeFromMessages(callback) {
  messageObservable.removeObserver(callback);
}
