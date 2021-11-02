import { useState } from "react";
import { Message } from "./components/message";
import { Counter } from "./components/counter";
import './App.css';

function App() {
  const [text, setText] = useState("You can click on me!");

  const handleClick = () => {
    setText("Your number: " + Math.round(Math.random() * 10));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Message message={text} onMessageClick={handleClick} />
        <Counter />
      </header>
    </div>
  );
}

export default App;
