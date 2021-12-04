import React from "react";
import { Message } from "./message";

export const MessageList = ({ messages }) => {
    return (
        <div className="messagesContainer">
            {messages.map((mes) => (
                // <div className="messageBlock" key={message.id}>
                //     <span>{message.author}</span>: <span>{message.text}</span>
                // </div>
                 <Message key={mes.id} message={mes} />
            ))}
        </div>
    );
};
