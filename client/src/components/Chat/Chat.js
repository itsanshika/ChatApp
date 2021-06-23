import React, { useState, useEffect } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
let socket;
const ENDPOINT = "localhost:5000";
function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    }); //important line for making socket work

    setRoom(room);
    setName(name);

    // console.log(socket);

    socket.emit("join", { name, room }, () => {
      //callbackfunction
    });

    return () => {
      socket.emit("disconnected ");
      socket.off();
    };
  }, [ENDPOINT, location]);

  //adding elemets in messaging array!
  useEffect(() => {
    socket.on("message", (messageInfo) => {
      setMessages((messages) => [...messages, messageInfo]);
    });
  }, [messages]);

  function sendMessage(event) {
    setMessage(event.target.value);
  }

  //for sending messages
  function sendMessageNow(event) {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        //callback
        setMessage("");
      });
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        {/* <Messages messages={messages} name={name} /> */}
        <Input message={message} messageTyped={sendMessage} sendMessage={sendMessageNow} />
      </div>
    </div>
  );
}

export default Chat;
