import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    height: 13%;
    width: 100%;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const DualContainer = styled.div`
    height: 87%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-items: auto;
    background-color: #bbe4b2d6;
`;

export const Right = styled.div`
    flex: 1.25;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(115deg, #41b147d5 0.23%, #81c740d4 92.92%);
`;

export const Logo = styled.img`
    opacity: 1;
    height: 80%;
    width: auto;
    padding: 5px;
    margin: 10px;
    align-self: flex-start;
`;

export const EndButton = styled.button`
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

export const InputContainer = styled.div`
    align-self: flex-end;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const MessageInput = styled.input`
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

export const InputButton = styled.button`
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

export const MessageContainer = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`;

export const Message = styled.div`
    display: flex;
    flex-direction: column;
`;

export const YourMessageBubble = styled.div`
    align-self: flex-end;
    background-color: #ffffff;
    padding: 4px 10px 0 10px;
    border-radius: 30px 30px 0px 30px;
    margin-top: 10px;
    margin-right: 10px;
    max-width: 70%;
    font-size: x-large;
`;

export const IncomingMessageBubble = styled.div`
  align-self: flex-start;
  background-color: #FFFFFF99;
  padding: 4px 10px 0 10px;
  border-radius: 30px 30px 30px 0px;
  margin-top: 10px;
  margin-left: 10px;
  max-width: 70%;
  font-size: x-large;
`;

export const YourTimestamp = styled.div`
    margin-top: 5px;
    margin-right: 10px;
    text-align: right;
    font-size: 12px;
    color: #666;
`;

export const IncomingTimestamp = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    text-align: left;
    font-size: 12px;
    color: #666;
`;
