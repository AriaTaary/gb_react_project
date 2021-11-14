import { useCallback, useEffect, useRef } from "react";
import { Form } from "./Form";
import { MessageList } from "./MessagesList";
import { AUTHORS } from "../utils/constants";

import { ChatList } from "./ChatsList";
import { Navigate, useParams } from "react-router";

function Chats({ chatList, messages, setMessages }) {
    const { chatId } = useParams();

    const parentRef = useRef();

    const handleSendMessage = useCallback(
        (newMessage) => {
            setMessages((prevMessages) => ({
                ...prevMessages,
                [chatId]: [...prevMessages[chatId], newMessage],
            }));
        },
        [chatId]
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
        <div className="chats-page" ref={parentRef}>
            <ChatList color="black" chatList={chatList} />
            <div className="chat">
                <MessageList messages={messages[chatId]} />
                <Form onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default Chats;
