import { ListItem, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Chat = ({ chat, onDeleteChat }) => {
    const handleDeleteClick = () => { onDeleteChat(chat.id) };

    return (
        <>
            <ListItem className="chatList-item">
                <NavLink
                    style={({ isActive }) => ({ color: isActive ? "#8484ee" : "black" })}
                    className="chatList-link"
                    to={`/chats/${chat.id}`}
                >
                    {chat.name}
                </NavLink>
                <Button className="button" variant="contained" type="submit" size="small" onClick={handleDeleteClick}>
                    Delete
                </Button>
            </ListItem>
        </>
    );
};
