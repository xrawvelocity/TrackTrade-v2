import React, { useState } from "react";
import Header from "components/partials/Header";
import { useAuth } from "context/authCtx";
import { parseFirebaseError } from "utils/misc";
import { Link } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { logIn } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await logIn(email, password);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Log in</button>
                    {error && <p>{parseFirebaseError(error.message)}</p>}
                    <span>
                        Don't have an account?{" "}
                        <Link to="/sign-up">Register</Link>
                    </span>
                </form>
            </div>
        </>
    );
}

export function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.includes(" ") || password.includes(" ")) {
            alert("No spaces allowed");
        } else {
            try {
                setLoading(true);
                await signUp(email, username, password);
            } catch (err) {
                setError(error);
            }
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                    />
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                    <button disabled={loading} type="submit">
                        Sign Up
                    </button>
                    {error && <p>{parseFirebaseError(error.message)}</p>}
                    <span>
                        Already have an account?{" "}
                        <Link to="/log-in">Log in</Link>
                    </span>
                </form>
            </div>
        </>
    );
}
