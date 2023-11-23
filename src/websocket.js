import { Client } from "@stomp/stompjs";
import websocket from "websocket";

// Import the event emitter for handling messages in the Chat component
import { EventEmitter } from "events";

Object.assign(global, { WebSocket: websocket.w3cwebsocket });

var client;
var role;
var sessionId;

// Create an event emitter instance
const messageEmitter = new EventEmitter();

export function connectWebsocket(userRole, sessionID) {
  role = userRole;
  sessionId = sessionID;

  client = new Client({
    brokerURL: "ws://localhost:8080/callhub",
    onConnect: () => {
      client.subscribe(`/topic/message-${role}/${sessionId}`, (message) => {
        // Emit the message to be handled by the Chat component
        messageEmitter.emit("message", message.body);
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

// Function to subscribe to WebSocket messages in the Chat component
export function subscribeToMessages(callback) {
  messageEmitter.on("message", callback);
}

// Function to unsubscribe from WebSocket messages in the Chat component
export function unsubscribeFromMessages(callback) {
  messageEmitter.off("message", callback);
}
