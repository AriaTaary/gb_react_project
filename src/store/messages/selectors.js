export const selectMessages = (state) => state.messages;

export const createSelectMessagesForChat = (chatId) => (state) => state.messages[chatId];