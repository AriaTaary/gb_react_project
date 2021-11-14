import React, { useRef, useState } from 'react';

export const Form = ({ onSendMessage }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef();

    const [count, setCount] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({
            text: value,
            author: 'Username',
            id: `user-message-${count}`,
        });

        setCount(count + 1);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="input" ref={inputRef} type="text" placeholder="Enter your message" value={value} onChange={handleChange} />
            <button className="button" type="submit">Send</button>
        </form>
    )
}
