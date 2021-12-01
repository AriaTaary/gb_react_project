import { List, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Chat } from "./Chat";

import { useDispatch, useSelector } from "react-redux";

import { selectChats } from "../store/chats/selectors";
import { addChatWithFb, initChatsTracking } from "../store/chats/actions";

export const ChatList = () => {

    const chatList = useSelector(selectChats);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    useEffect(() => {
        dispatch(initChatsTracking());
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newId = `chat${Date.now()}`;
        dispatch(addChatWithFb({ name: value, id: newId }));
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