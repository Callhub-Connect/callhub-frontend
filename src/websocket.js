import { Client } from "@stomp/stompjs";
import websocket from "websocket";

Object.assign(global, { WebSocket: websocket.w3cwebsocket });

var client;
var role;
var sessionId;

export function connectWebsocket(userRole, sessionID) {
  role = userRole;
  sessionId = sessionID;

  client = new Client({
    brokerURL: "ws://localhost:8080/callhub",
    onConnect: () => {
      client.subscribe(`/topic/message-${role}/${sessionId}`, (message) => {
        // TODO: handle received message
        console.log(`Received: ${message.body}`);
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
  client.deactivate();
  console.log("websocket disconnected");
}

export function sendMessageWebsocket(message) {
  client.publish({
    destination: `/app/message-${role}/${sessionId}`,
    body: message,
  });
}
