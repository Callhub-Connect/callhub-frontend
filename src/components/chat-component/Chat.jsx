import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PdfFileManager from "../../helper-components/pdf-manager-component/PdfManager";
import { sendMessageWebsocket, disconnectWebsocket, subscribeToMessages, unsubscribeFromMessages, endSessionWebsocket, subscribeToEndSession, unsubscribeToEndSession } from "../../websocket";
import { 
  Container, 
  Header, 
  DualContainer, 
  Left, 
  Right, 
  Logo, 
  EndButton, 
  InputContainer, 
  MessageInput, 
  InputButton, 
  MessageContainer, 
  Message, 
  YourMessageBubble, 
  IncomingMessageBubble, 
  YourTimestamp, 
  IncomingTimestamp,
} from "./Chat-styles";

function Chat() {
  const storedMessages = JSON.parse(sessionStorage.getItem("chatMessages"));
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(storedMessages || []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    const newMessage = { message: inputMessage, timestamp, sentByYou: true };

    // send to websocket
    sendMessageWebsocket(inputMessage)

    const newMessages = [...messages, newMessage];
    
    sessionStorage.setItem("chatMessages", JSON.stringify(newMessages));

    setMessages(newMessages);
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // session ended by other user
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sessionEnded = useCallback(() => {
    alert("Session was ended by other user");
    clearSessionAndNavigate();
  });

  function notifyEndSession(){
    let url = "http://localhost:8080/session/end-session/" + sessionStorage.getItem('sessionCode');
    axios.get(url)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    notifyEndSession();
    clearSessionAndNavigate();
  };

function clearSessionAndNavigate(){
    // Clear the messages when the session ends
    setMessages([]);
    sessionStorage.removeItem("chatMessages");
    sessionStorage.removeItem("sessionId");
    sessionStorage.removeItem("sessionCode");
    unsubscribeToEndSession(sessionEnded);

    endSessionWebsocket();
    disconnectWebsocket();
    
    let path = `/end`; 
    navigate(path);
  };

  // Create a ref to the MessageContainer element
  const messageContainerRef = useRef();

  // Function to keep the scroll at the bottom of the MessageContainer
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  
    // Subscribe to incoming WebSocket messages
    const handleIncomingMessage = (message) => {
      const messageJSON = JSON.parse(message);
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      const newMessage = {
        message: messageJSON.message,
        timestamp,
        sentByYou: false, // Set to false for incoming messages
      };
      console.log(messageJSON.message);
  
      const newMessages = [...messages, newMessage];
      sessionStorage.setItem("chatMessages", JSON.stringify(newMessages));
      setMessages(newMessages);
    };
  
    subscribeToMessages(handleIncomingMessage);
    subscribeToEndSession(sessionEnded);
  
    // Unsubscribe when the component is unmounted
    return () => {
      unsubscribeFromMessages(handleIncomingMessage);
    };
  }, [messages, sessionEnded]);

  return (
    <Container>
      <Header>
        <Logo src="./img/callhubLogo2.svg" alt="Callhub Logo" />
        <div style={{ display: "flex", gap: "20px", alignItems: "center", width: "330px"}}>
          <h2>{sessionStorage.getItem("sessionCode")}</h2>
          <EndButton onClick={routeChange}>End Session</EndButton>
        </div>
      </Header>
      <DualContainer>
        <Left>
          <PdfFileManager />
        </Left>
        <Right>
        <MessageContainer ref={messageContainerRef}>
          {messages.map((messageItem, index) => (
            <Message key={index}>
              {messageItem.sentByYou ? (
                <>
                  <YourMessageBubble>{messageItem.message}</YourMessageBubble>
                  <YourTimestamp>{messageItem.timestamp}</YourTimestamp>
                </>
              ) : (
                <>
                  <IncomingMessageBubble>{messageItem.message}</IncomingMessageBubble>
                  <IncomingTimestamp>{messageItem.timestamp}</IncomingTimestamp>
                </>
              )}
            </Message>
          ))}
        </MessageContainer>
          <InputContainer>
            <MessageInput
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <InputButton onClick={handleSendMessage}>Send</InputButton>
          </InputContainer>
        </Right>
      </DualContainer>
    </Container>
  );
}

export default Chat;
