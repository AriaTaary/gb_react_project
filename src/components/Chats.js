import { useCallback } from "react";
import { Form } from "./Form";
import { MessageList } from "./MessagesList";

import { ChatList } from "./ChatsList";
import { Navigate, useParams } from "react-router";
import { connect } from "react-redux";

import { addMessageWithReply } from "../store/messages/actions";

function Chats({ messages, sendMessage }) {
    const { chatId } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            sendMessage(chatId, newMessage);
        },
        [chatId, sendMessage]
    );

    if (!messages[chatId]) {
        return <Navigate replace to="/chats" />;
    }

    return (
        <div className="chats-page">
            <ChatList color="black"/>
            <div className="chat">
                <MessageList messages={messages[chatId]} />
                <Form onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default Chats;

const mapStateToProps = (state) => ({
    messages: state.messages,
});

const mapDispatchToProps = {
    sendMessage: addMessageWithReply,
};

export const ConnectedChats = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);