
import React from "react";

export const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message) => (
                <div className="messageBlock" key={message.id}>
                    <span>{message.author}</span>: <span>{message.text}</span>
                </div>
            ))}
        </div>
    );
};