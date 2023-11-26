import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PdfFileManager from "./PdfManager";
import { sendMessageWebsocket, disconnectWebsocket, subscribeToMessages, unsubscribeFromMessages} from "../websocket";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 13%;
    width: 100%;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DualContainer = styled.div`
    height: 87%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-items: auto;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #bbe4b2d6;
`;

const Right = styled.div`
    flex: 1.5;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(115deg, #41b147d5 0.23%, #81c740d4 92.92%);
`;

const Logo = styled.img`
    opacity: 1;
    height: 80%;
    width: auto;
    padding: 5px;
    margin: 10px;
    align-self: flex-start;
`;

const EndButton = styled.button`
    font-family: 'League Spartan', sans-serif;
    background-color: #000000;
    border-radius: 30px;
    padding: 8px 16px;
    margin: auto;
    margin-right: 8%;
    color: white;
    font-size: x-large;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }
`;

const InputContainer = styled.div`
    align-self: flex-end;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const MessageInput = styled.input`
    border-radius: 30px 0px 0px 30px;
    border: 0px solid;
    width: 80%;
    height: 50px;
    padding: 8px 16px;
    margin-bottom: 20px;
    margin-left: 20px;
    line-height: 20px;
    font-size: x-large;
    font-family: 'League Spartan', sans-serif;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 18px;
    }
`;

const InputButton = styled.button`
    width: 15%;
    height: 50px;
    padding: 8px 16px;
    margin-right: 20px;
    font-family: 'League Spartan', sans-serif;
    background-color: black;
    border-radius: 0px 30px 30px 0px;
    position: relative;
    color: white;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }
`;

const MessageContainer = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`;

const Message = styled.div`
    display: flex;
    flex-direction: column;
`;

const YourMessageBubble = styled.div`
    align-self: flex-end;
    background-color: #ffffff;
    padding: 4px 10px 0 10px;
    border-radius: 30px 30px 0px 30px;
    margin-top: 10px;
    margin-right: 10px;
    max-width: 70%;
    font-size: x-large;
`;

const IncomingMessageBubble = styled.div`
  align-self: flex-start;
  background-color: #FFFFFF99;
  padding: 4px 10px 0 10px;
  border-radius: 30px 30px 30px 0px;
  margin-top: 10px;
  margin-left: 10px;
  max-width: 70%;
  font-size: x-large;
`;

const YourTimestamp = styled.div`
    margin-top: 5px;
    margin-right: 10px;
    text-align: right;
    font-size: 12px;
    color: #666;
`;

const IncomingTimestamp = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    text-align: left;
    font-size: 12px;
    color: #666;
`;

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

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    // Clear the messages when the session ends
    setMessages([]);
    sessionStorage.removeItem("chatMessages");
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
  
    // Unsubscribe when the component is unmounted
    return () => {
      unsubscribeFromMessages(handleIncomingMessage);
    };
  }, [messages]);

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
