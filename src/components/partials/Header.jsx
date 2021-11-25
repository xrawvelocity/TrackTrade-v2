import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <div className="navigation">
                <Link to="/" className="navigation--brand">
                    Track Trade
                </Link>
                <ul className="navigation--right">
                    <li id="about">
                        <Link
                            className="navigation--link navigation--login"
                            to="/log-in"
                        >
                            Log In
                        </Link>
                    </li>
                    <li id="contact">
                        <Link
                            className="navigation--link navigation--signup"
                            to="/sign-up"
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
