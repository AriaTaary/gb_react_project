import { useCallback, useEffect, useRef, useState } from "react";
import './App.css';

// import { Message } from "./components/Message";
// import { Counter } from "./components/Counter";
import { Form } from "./components/Form";
import { MessageList } from "./components/MessagesList";

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
            author: 'Bot',
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
      <div>
        <header className="App-header">
        {/* <Message message={text} onMessageClick={handleClick} />
        <Counter /> */}
        <MessageList messages={messages} />
        <Form onSendMessage={handleSendMessage} />
        </header>
      </div>
    </div>
  );
}

export default App;
