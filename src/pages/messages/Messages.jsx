import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import getRandomColor from "utils/randomColor";
import { isAccessible } from "get-contrast";
import ContentWrapper from "components/partials/ContentWrapper";
import { db } from "firebase/firebase";

const Message = (props) => {
    return (
        <div className={`message ${props.isUser ? "user" : "other"}`}>
            <div className="message-text">{props.text}</div>
        </div>
    );
};

const MessageInput = (props) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text) {
            props.onSubmit({ isUser: true, text });
            setText("");
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="message-input-field"
                placeholder="Type your message here..."
            />
            <button className="message-input-submit" type="submit">
                Send
            </button>
        </form>
    );
};

const PeopleList = ({ people }) => {
    const [selectedId, setSelectedId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const currentId = history.location.pathname.split("/")[2];
        console.log(currentId);
        if (currentId) setSelectedId(currentId);
    }, [history.location.pathname]);

    const handleClick = (id) => {
        setSelectedId(id);
        history.push(`/messages/${id}`);
    };

    return (
        <div className="people-list">
            {people.map((person) => {
                const randomColor = getRandomColor();
                const textColor = isAccessible(randomColor, "#000")
                    ? "black"
                    : "white";

                return (
                    <div
                        className={`people-list-item ${
                            person.id === selectedId ? "selected" : ""
                        }`}
                        key={person.id}
                        onClick={() => handleClick(person.id)}
                    >
                        <div
                            className="people-list-item-avatar"
                            style={{
                                "--random-color": randomColor,
                                "--text-color": textColor,
                            }}
                        >
                            {person.username[0]}
                        </div>
                        <div className="people-list-item-username">
                            {person.username}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

function Messages() {
    // const messagesRef = db.ref("messages");
    const people = [
        { username: "Alice", id: 1 },
        { username: "Bob", id: 2 },
        { username: "Charlie", id: 3 },
        { username: "David", id: 4 },
        { username: "Eve", id: 5 },
    ];

    const [messages, setMessages] = useState([
        { isUser: false, text: "Hello!" },
        { isUser: true, text: "Hi there!" },
        { isUser: false, text: "How are you?" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    // useEffect(() => {
    //     messagesRef.on("value", (snapshot) => {
    //         const data = snapshot.val();
    //         const messages = Object.keys(data).map((key) => {
    //             return { id: key, ...data[key] };
    //         });
    //         setMessages(messages);
    //     });
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // messagesRef.push({ text: newMessage });
        setNewMessage("");
    };

    return (
        <ContentWrapper>
            <div className="messages">
                <div className="messages-list">
                    <PeopleList people={people} />
                </div>
                <div className="messages-chat">
                    <div>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                isUser={message.isUser}
                                text={message.text}
                            />
                        ))}
                    </div>
                    <MessageInput onSubmit={handleSubmit} />
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Messages;
