import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Chats from "./components/Chats";
import { Home } from "./components/HomePage";
import { ConnectedProfile, Profile } from "./components/ProfilePage";
import ChatList from "./components/ChatsList";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { addChat, deleteChat } from "./store/chats/actions";

import './App.css';

const initialMessages = {};

export const App = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#8484ee',
      },
    },
  });

  const chatList = useSelector((state) => state.chats);
  const [messages, setMessages] = useState(initialMessages);
  const dispatch = useDispatch();

  const handleAddChat = useCallback(
    (name) => {
      const newId = `chat${Date.now()}`;

      dispatch(addChat({ name, id: newId }));
      setMessages((prevMessages) => ({
        ...prevMessages,
        [newId]: [],
      }));
    },
    [dispatch]
  );

  const handleDeleteChat = useCallback((idToDelete) => {
    dispatch(deleteChat(idToDelete));
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[idToDelete];

      return newMessages;
    });
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
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
                    <Link to="/profile" className="menu-link">Profile</Link>
                  </ListItem>
                </List>
                

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="profile" element={<ConnectedProfile />} />
                  <Route path="chats">
                    <Route 
                      index 
                      element={
                        <ChatList 
                          onAddChat={handleAddChat}
                          onDeleteChat={handleDeleteChat}
                          chatList={chatList} 
                        />
                      } 
                    />
                    <Route
                      path=":chatId"
                      element={
                        <Chats
                          chatList={chatList}
                          messages={messages}
                          setMessages={setMessages}
                          onAddChat={handleAddChat}
                          onDeleteChat={handleDeleteChat}
                        />
                      }
                    />
                  </Route>
                  <Route path="*" element={<h3>404</h3>} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
