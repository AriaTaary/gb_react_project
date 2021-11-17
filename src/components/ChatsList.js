import { List, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Chat } from "./Chat";

export const ChatList = ({ chatList, onAddChat, onDeleteChat }) => {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddChat(value);

        setValue("");
    };

    return (
        <div className="chatList">
            <div className="chatListHeader">Chats list</div>
            <List disablePadding>
                {chatList.map((chat) => (
                    <Chat key={chat.id} chat={chat} onDeleteChat={onDeleteChat} />
                ))}
            </List>
            <form className="chatListForm" onSubmit={handleSubmit}>
                <TextField size="small" value={value} onChange={handleChange} />
                <Button className="button" variant="contained" type="submit" size="large">
                    Add chat
                </Button>
            </form>
        </div>
    );
};

export default ChatList;