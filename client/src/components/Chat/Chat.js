import React, { useState, useEffect } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";


import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from '../TextContainer/TextContainer';

let socket;
const ENDPOINT = "https://chatapp2k21.herokuapp.com/";

function Chat({ location }) {


  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    }); //important line for making socket work

    setRoom(room);
    setName(name);

    // console.log(socket);

    socket.emit("join", { name, room }, (error) => {
      //callbackfunction
      if(error)
      {
        alert(error);
      }
    });

    // return () => {
    //   socket.emit("disconnected ");
    //   socket.off();
    // };
  }, [ENDPOINT, location.search]);

  //adding elemets in messaging array!
  useEffect(() => {
    socket.on("message", (messageInfo) => {
      setMessages((messages) => [...messages, messageInfo]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  }, []);

  //for sending messages
  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        //callback
        setMessage("");
      });
    }
  }

  //console.log(messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
