import React, { useState, useEffect } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";

let socket;
const ENDPOINT = 'localhost:5000';
function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']}); //important line for making socket work


setRoom(room);
setName(name);

// console.log(socket);

socket.emit('join',{name,room},()=>
{
    //callbackfunction
});

return ()=>
{
    socket.emit('disconnect');
    socket.off();
}

  }, [ENDPOINT,location]);



  return <h1> Chat page</h1>;
}
export default Chat;
