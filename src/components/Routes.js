import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { ChatList } from "./ChatsList";
import { ConnectedChats } from "./Chats";
import { Home } from "./HomePage";
import { ConnectedProfile } from "./ProfilePage";
import { News } from "./News";
import { PrivateRoute } from "./PrivateRoute";
import { PublicOutlet } from "./PublicRoute";
import { SignUp } from "./SignUp";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onValue } from "firebase/database";

import { auth, messagesRef } from "../services/firebase";
import { signIn, signOut } from "../store/profile/actions";

export const Router = () => {
    const dispatch = useDispatch();
    const [msgs, setMsgs] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(signIn());
            } else {
                dispatch(signOut());
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const newMsgs = {};

            snapshot.forEach((chatMsgsSnap) => {
                newMsgs[chatMsgsSnap.key] = Object.values(
                    chatMsgsSnap.val().messageList || {}
                );
            });

            setMsgs(newMsgs);
        });
    }, []);

    return (
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
                    <Route path="/" element={<PublicOutlet />}>
                        <Route path="" element={<Home />} />
                    </Route>
                    <Route path="/signup" element={<PublicOutlet />}>
                        <Route path="" element={<SignUp />} />
                    </Route>
                    <Route
                        path="profile"
                        element={
                            <PrivateRoute>
                                <ConnectedProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route path="chats">
                        <Route 
                            index 
                            element={
                                <PrivateRoute>
                                    <ChatList />
                                </PrivateRoute>
                            } 
                        />
                        <Route
                            path=":chatId"
                            element={
                                <PrivateRoute>
                                    <ConnectedChats msgs={msgs} />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                    <Route path="news" element={<News />} />
                    <Route path="*" element={<h3>404</h3>} />
                </Routes>
                </div>
            </div>
        </div>
    </BrowserRouter>
    );
};