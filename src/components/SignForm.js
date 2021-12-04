import { useState } from "react";
import { TextField, Button } from "@mui/material";

export const SignForm = ({ onSubmit, error, loading }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePass = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(email, pass);
        setEmail("");
        setPass("");
    };

    return (
        <div className="regFormWrapper">
            <form className="regForm" onSubmit={handleSubmit}>
                <TextField size="small" type="text" value={email} onChange={handleChangeEmail}  />
                <TextField size="small" type="password" value={pass} onChange={handleChangePass} />
                <Button className="button" variant="contained" type="submit" size="medium" disabled={loading}>GO!</Button>
            </form>
            {error && <h4>{error}</h4>}
        </div>
    );
};