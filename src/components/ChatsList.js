import { ListItem, List } from "@mui/material";
import { NavLink } from "react-router-dom";

export const ChatList = ({ chatList }) => {

    return (
        <div className="chatList">
            <div className="chatListHeader">Chats list</div>
            <List disablePadding>
                {chatList.map((chat) => (
                    <ListItem>
                        <NavLink
                            style={({ isActive }) => ({ color: isActive ? "#8484ee" : "black" })}
                            className="chatList-link"
                            to={`/chats/${chat.id}`}
                        >
                            {chat.name}
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ChatList;