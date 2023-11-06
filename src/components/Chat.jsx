import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

const DualContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
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
    padding-left: 20px;
    padding-top: 10px;
    align-self: flex-start;
`;

const Button = styled.button`
    font-family: 'League Spartan', sans-serif;
    background-color: #000000;
    border-radius: 30px;
    padding: 10px 20px 10px 20px;
    margin: auto;
    margin-right: 2%;
    color: white;
    font-size: x-large;
    height: fit-content;
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
    width: 70%;
    padding: 8px 18px;
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
    height: fit-content;
    padding: 8px 16px;
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

const MessageBubble = styled.div`
    align-self: flex-end;
    background-color: #ffffff;
    padding: 10px 14px;
    border-radius: 30px 30px 0px 30px;
    margin-top: 10px;
    margin-right: 10px;
    max-width: 50%;
    font-size: x-large;
`;

const Timestamp = styled.div`
    margin-top: 5px;
    margin-right: 10px;
    text-align: right;
    font-size: 12px;
    color: #666;
`;

const UploadButton = styled.label` 
    font-family: 'League Spartan', sans-serif;
    border-radius: 30px;
    padding: 21px;
    margin-right: 15px;
    margin-left: 10px;
    background: url(./img/upload.svg);
    font-size: large;
    height: fit-content;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
        background-color: #ffffff;
    }
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PdfViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString();

    setMessages([...messages, { message: inputMessage, timestamp }]);
    setInputMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPdfVisible(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/end`; 
    navigate(path);
  }

  return (
    <Container>
      <Header>
        <Logo src="./img/callhubLogo2.svg" alt="Callhub Logo" />
        <Button onClick={routeChange}>End Session</Button>
      </Header>
      <DualContainer>
        <Left>
          <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "none" }} id="fileInput" />
          <PdfViewer src={selectedFile && URL.createObjectURL(selectedFile)} isVisible={pdfVisible} title="uploaded pdf" />
        </Left>
        <Right>
          <MessageContainer>
            {messages.map((messageItem, index) => (
              <Message key={index}>
                <MessageBubble>{messageItem.message}</MessageBubble>
                <Timestamp>{messageItem.timestamp}</Timestamp>
              </Message>
            ))}
          </MessageContainer>
          <InputContainer>
            <MessageInput
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <InputButton onClick={handleSendMessage}>Send</InputButton>
            <UploadButton htmlFor="fileInput" />
          </InputContainer>
        </Right>
      </DualContainer>
    </Container>
  );
}

export default Chat;
