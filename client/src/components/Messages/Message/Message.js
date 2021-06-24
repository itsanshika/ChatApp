import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let issentbyuser = false;
  const trimedname = name.trim().toLowerCase();
  if (trimedname === user) {
    issentbyuser = true;
  }
  return issentbyuser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimedname}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
