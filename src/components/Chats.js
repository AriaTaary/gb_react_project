import { useCallback, useEffect } from "react";
import { Form } from "./Form";
import { MessageList } from "./MessagesList";
import { AUTHORS } from "../utils/constants";

import { ChatList } from "./ChatsList";
import { Navigate, useParams } from "react-router";
import { connect } from "react-redux";

import { addMessage } from "../store/messages/actions";

function Chats({ messages, sendMessage }) {
    const { chatId } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            sendMessage(chatId, newMessage);
        },
        [chatId, sendMessage]
    );

    useEffect(() => {
        if (
            messages[chatId]?.length &&
            messages[chatId]?.[messages[chatId]?.length - 1].author !== AUTHORS.bot
        ) {
            const timeout = setTimeout(
                () =>
                    handleSendMessage({
                        author: AUTHORS.bot,
                        text: "Hello, how can I help you?",
                        id: `mes-${Date.now()}`,
                    }),
                1500
            );

            return () => clearTimeout(timeout);
        }
    }, [messages]);

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
    sendMessage: addMessage,
};

export const ConnectedChats = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);