import React, { useRef, useState } from 'react';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { AUTHORS } from "../utils/constants";

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
            author: AUTHORS.user,
            id: `user-message-${count}`,
        });
        
        inputRef.current?.focus();
        setCount(count + 1);
        setValue("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                id="chat-input"
                label="Enter your message"
                variant="outlined"
                value={value}
                onChange={handleChange}
                inputRef={inputRef}
                size="small"
                fullWidth
            />
            <Button className="button" variant="contained" type="submit" size="large">
                Send
            </Button>
        </form>
    )
}