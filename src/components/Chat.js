import { ListItem, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteChat } from "../store/chats/actions";

export const Chat = ({ chat }) => {
    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(deleteChat(chat.id));
    };

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
