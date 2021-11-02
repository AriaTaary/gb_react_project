
import React, { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1 className="counterText">{count}</h1>
            <button className="counterButton" onClick={handleClick}>Click!</button>
        </div>
    );
};