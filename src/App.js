import { useState } from "react";
import './App.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { AUTHORS } from "./utils/constants";

import Chats from "./components/Chats";
import { Home } from "./components/HomePage";
import { Profile } from "./components/ProfilePage";
import ChatList from "./components/ChatsList";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { store } from "./store";

const initialChatList = [
  {
    name: "First chat",
    id: "chat1",
  },
  {
    name: "Second chat",
    id: "chat2",
  },
  {
    name: "Third chat",
    id: "chat3",
  },
];

const initialMessages = {
  chat1: [
    {
      text: "hello first chat!",
      author: AUTHORS.user,
    },
  ],
  chat2: [
    {
      text: "hello second chat!",
      author: AUTHORS.user,
    },
  ],
  chat3: [],
};

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#8484ee',
      },
    },
  });

  const [chatList, setChatList] = useState(initialChatList);
  const [messages, setMessages] = useState(initialMessages);

  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
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
                  <Route path="profile" element={<Profile />} />
                  <Route path="chats">
                    <Route index element={<ChatList chatList={chatList} />} />
                    <Route
                      path=":chatId"
                      element={
                        <Chats
                          chatList={chatList}
                          messages={messages}
                          setMessages={setMessages}
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
      </Provider>
    </ThemeProvider>
  );
}

export default App;