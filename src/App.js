import { useCallback, useEffect, useRef, useState } from "react";
import './App.css';

// import { Message } from "./components/Message";
// import { Counter } from "./components/Counter";
import { Form } from "./components/Form";
import { MessageList } from "./components/MessagesList";
import { AUTHORS } from "./utils/constants";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

function App() {
  // const [text, setText] = useState("You can click on me!");

  // useEffect(() => {}, [])
  // const handleClick = () => {
  //   setText("Your number: " + Math.round(Math.random() * 10));
  // };
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
    <div className="App" ref={parentRef}>
      <div className="wrapper">
        {/* <header className="App-header"> */}
          {/* <Message message={text} onMessageClick={handleClick} />
        <Counter /> */}
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
        {/* </header> */}
        </div>
      </div>
    </div>
  );
}

export default App;