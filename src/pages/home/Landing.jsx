import { useAuth } from "context/authCtx";
import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/partials/Header";

const Landing = (props) => {
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        console.log("currentUser", currentUser);
        if (currentUser?.uid) {
            history.push("/dashboard");
        }
    }, [currentUser]);

    return (
        <div className="landing">
            <Header {...props} loggedIn={false} />

            <main className="landing-main">
                <div className="landing-main--text">
                    <h1 className="landing-main--title">
                        A Forex Trading Hub with a touch of social media
                    </h1>
                    <p className="landing-main--description">
                        Easily visualize your progress with charts. Connect with
                        your peers and message them about your trade ideas.
                    </p>
                    <a href="/sign-up" className="landing-main--button">
                        Get Started
                    </a>
                </div>
                <div className="landing-main--image-container">
                    <div className="landing-main--image"></div>
                </div>
            </main>
            <section className="landing-section-1">
                <h1 className="landing-section-1--title">What we offer:</h1>
                <div className="landing-section-1--cards">
                    <div className="landing-section-1--cards__1">
                        <div className="landing-section-1--cards__1--image"></div>
                        <h2 className="landing-section-1--cards__1--title">
                            Display your trading data like never before
                        </h2>
                        <p className="landing-section-1--cards__1--text">
                            Charts will be your best friend, easily visually
                            your progress.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__1--button">Learn more</a> */}
                    </div>

                    <div className="landing-section-1--cards__2">
                        <div className="landing-section-1--cards__2--image"></div>
                        <h2 className="landing-section-1--cards__2--title">
                            Compete with other traders
                        </h2>
                        <p className="landing-section-1--cards__2--text">
                            Competition can be a great motivation, we made it
                            easy for you to share your results with other
                            traders.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__2--button">Learn more</a> */}
                    </div>

                    <div className="landing-section-1--cards__3">
                        <div className="landing-section-1--cards__3--image"></div>
                        <h2 className="landing-section-1--cards__3--title">
                            Message other traders about your trade ideas
                        </h2>
                        <p className="landing-section-1--cards__3--text">
                            Keep all of your trading ideas in one place and
                            share them with others so they can hold you
                            accountable.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__3--button">Learn more</a> */}
                    </div>

                    <div className="landing-section-1--cards__4">
                        <div className="landing-section-1--cards__4--image"></div>
                        <h2 className="landing-section-1--cards__4--title">
                            Share any trade on your favorite social media
                        </h2>
                        <p className="landing-section-1--cards__4--text">
                            Don't let your friends that are not using this
                            website behind.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__4--button">Learn more</a> */}
                    </div>

                    <div className="landing-section-1--cards__5">
                        <div className="landing-section-1--cards__5--image"></div>
                        <h2 className="landing-section-1--cards__5--title">
                            Calculate your lot size for proper risk management
                        </h2>
                        <p className="landing-section-1--cards__5--text">
                            Be methodical on your trades, keep yourself
                            accountable by always using this tool.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__5--button">Learn more</a> */}
                    </div>

                    <div className="landing-section-1--cards__6">
                        <div className="landing-section-1--cards__6--image"></div>
                        <h2 className="landing-section-1--cards__6--title">
                            Get email alert on currency prices and news
                        </h2>
                        <p className="landing-section-1--cards__6--text">
                            Stop trying to remember to check the news for any
                            big events or to check if the market is at a
                            specific price, let us help you ease your mind.
                        </p>
                        {/* <a href="#" className="landing-section-1--cards__6--button">Learn more</a> */}
                    </div>
                </div>
            </section>
            <section className="landing-about">
                <div className="landing-about--text">
                    <h1 className="landing-about--title">About</h1>
                    <p className="landing-about--description">
                        Hello! My name is Victor Fernandez and I created this
                        website because I have always found it inconvenient to
                        share my trades on other social media platforms where
                        you find a huge variety of content. I wanted to create a
                        hub for everything trading related, all free, and
                        simple.
                    </p>
                    <a
                        href="https://linkedin.com/in/victor--fernandez"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-about--button"
                    >
                        Get In Touch
                    </a>
                </div>
            </section>
            <footer className="footer">
                <div className="footer-image-container">
                    <div className="footer-image"></div>
                </div>
                <div className="row">
                    <div className="col-1-of-2">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a
                                        href="https://www.linkedin.com/in/victor--fernandez/"
                                        className="footer__link"
                                    >
                                        Linked In
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a
                                        href="https://github.com/xrawvelocity"
                                        className="footer__link"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a
                                        href="mailto:tracktradehelp@gmail.com"
                                        className="footer__link"
                                    >
                                        Contact email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-1-of-2">
                        <p className="footer__copyright">
                            Copyright &copy; {new Date().getFullYear()} by
                            Victor Fernandez
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
