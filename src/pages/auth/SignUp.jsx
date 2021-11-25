import Header from "pages/partials/Header";
import React, { Component, useState } from "react";
import { useHistory } from "react-router";

import { useAuth } from "../../context/authCtx";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.includes(" ") || password.includes(" ")) {
            alert("No spaces allowed");
        } else {
            try {
                setLoading(true);
                await signUp(email, username, password);

                history.push("/dashboard");
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    };

    return (
        <div className="signuppage">
            <Header />
            <div className="signup">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="signup-form-input"
                            placeholder="smithjohntrades123"
                            name="email"
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="email">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="signup-form-input"
                            placeholder="smithjohntrades123"
                            name="username"
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="signup-form-input"
                            name="password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="signup-form-btn"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
