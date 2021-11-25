import { useAuth } from "context/authCtx";
import Header from "pages/partials/Header";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useAuth();

    const history = useHistory();

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        try {
            await logIn(email, password);
            console.log("logged in");
            history.push("/dashboard");
        } catch (err) {
            console.log(err);
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
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="signup-form-input"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-form-btn">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
