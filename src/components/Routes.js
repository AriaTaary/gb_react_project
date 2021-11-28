import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { ChatList } from "./ChatsList";
import { ConnectedChats } from "./Chats";
import { Home } from "./HomePage";
import { ConnectedProfile } from "./ProfilePage";
import { News } from "./News";

export const Router = () => (
    <BrowserRouter>
        <div className="App">
            <div className="wrapper">
                <div className="container">

                <List disablePadding className="menu">
                    <ListItem disablePadding className="menu-item">
                        <Link to="/" className="menu-link">Home</Link>
                    </ListItem>
                    <ListItem disablePadding className="menu-item">
                        <Link to="/chats" className="menu-link">Chats</Link>
                    </ListItem>
                    <ListItem disablePadding className="menu-item">
                        <Link to="/news" className="menu-link">News</Link>
                    </ListItem>
                    <ListItem disablePadding className="menu-item">
                        <Link to="/profile" className="menu-link">Profile</Link>
                    </ListItem>
                </List>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="profile" element={<ConnectedProfile />} />
                    <Route path="chats">
                        <Route index element={<ChatList />} />
                        <Route path=":chatId" element={<ConnectedChats />} />
                    </Route>
                    <Route path="news" element={<News />} />
                    <Route path="*" element={<h3>404</h3>} />
                </Routes>
                </div>
            </div>
        </div>
    </BrowserRouter>
);