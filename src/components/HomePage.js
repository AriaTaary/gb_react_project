import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logIn } from "../services/firebase";
import { SignForm } from "./SignForm";

export const Home = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (email, pass) => {
        setLoading(true);
        try {
            await logIn(email, pass);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <h3>Home</h3>
            <SignForm onSubmit={handleSignIn} error={error} loading={loading} />
            <Link className="link" to="/signup">Sign Up</Link>
        </div>
    );
};
