import { AUTHORS } from "../../utils/constants";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";

export const addMessage = (chatId, message) => ({
    type: ADD_MESSAGE,
    payload: { chatId, message },
});

export const deleteMessage = (chatId, idToDelete) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        idToDelete,
    },
});

let timeout;

export const addMessageWithReply = (chatId, message) => (dispatch) => {
    dispatch(addMessage(chatId, message));

    if (message.author !== AUTHORS.bot) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            const botMessage = {
                author: AUTHORS.bot,
                id: `mess${Date.now()}`,
                text: "Hello, how can I help you?",
            };
            dispatch(addMessage(chatId, botMessage));
        }, 1500);
    }
};