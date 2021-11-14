import { useCallback, useEffect, useRef, useState } from "react";
import './App.css';

import { Form } from "./components/Form";
import { MessageList } from "./components/MessagesList";
import { AUTHORS } from "./utils/constants";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#8484ee',
      },
    },
  });

  const messagesList = [];

  const [messages, setMessages] = useState(messagesList);
  const parentRef = useRef();
  const [count, setCount] = useState(0);

  const handleSendMessage = useCallback((newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].author !== 'Bot') {
      const timeout = setTimeout(
        () =>
          handleSendMessage({
            author: AUTHORS.bot,
            text: "Hello, how can I help you?",
            id: `bot-message-${count}`,
          }),
        1000
      );
      setCount(count + 1);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  return (
    <ThemeProvider theme={customTheme}>
      <div className="App" ref={parentRef}>
        <div className="wrapper">
          <div className="container">
            <div className="chatList">
              <div className="chatListHeader">Chats list</div>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="One" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Two" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Three" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
            <div className="chat">
              <MessageList messages={messages} />
              <Form onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
