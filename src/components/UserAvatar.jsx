import React from "react";
import userDefault from "../images/userdefault.png";

const UserAvatar = ({ imageUrl, style }) => {
    return (
        <img
            style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                zIndex: "-20",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#ccc",
                overflow: "hidden",
                ...style,
            }}
            src={imageUrl ? imageUrl : userDefault}
            alt="Avatar"
        />
    );
};

export default UserAvatar;
