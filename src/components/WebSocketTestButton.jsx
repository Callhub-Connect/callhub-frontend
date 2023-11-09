import {connect, disconnect} from '../websocket'

function connectWebsocket(){
    console.log("button clicked");
    connect();
}

function WebsocketButton(){
    return(
        <button onClick={connectWebsocket}>Websocket test</button>
    );
}

export default WebsocketButton