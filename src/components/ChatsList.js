import { List, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Chat } from "./Chat";

import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../store/chats/actions";
import { selectChats } from "../store/chats/selectors";

export const ChatList = () => {

    const chatList = useSelector(selectChats);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newId = `chat${Date.now()}`;
        dispatch(addChat({ name: value, id: newId }));

        setValue("");
    };

    return (
        <div className="chatList">
            <div className="chatListHeader">Chats list</div>
            <List disablePadding>
                {chatList.map((chat) => (
                    <Chat key={chat.id} chat={chat}/>
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