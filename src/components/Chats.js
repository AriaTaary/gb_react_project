import { useCallback } from "react";
import { Navigate, useParams } from "react-router";
import { connect } from "react-redux";
import { push } from "firebase/database";

import { Form } from "./Form";
import { MessageList } from "./MessagesList";
import { ChatList } from "./ChatsList";

import { addMessageWithReply } from "../store/messages/actions";
import { getChatMsgsListRefById } from "../services/firebase";

function Chats({ msgs, sendMessage }) {
    const { chatId } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            push(getChatMsgsListRefById(chatId), newMessage);
        },
        [chatId, sendMessage]
    );

    if (!msgs[chatId]) {
        return <Navigate replace to="/chats" />;
    }

    return (
        <div className="chats-page">
            <ChatList color="black"/>
            <div className="chat">
                <MessageList messages={msgs[chatId]} />
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