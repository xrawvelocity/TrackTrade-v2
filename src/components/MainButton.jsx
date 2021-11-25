import React from "react";

const MainButton = ({ children, onClick, ...props }) => {
    return (
        <button
            style={{
                backgroundColor: "#2ba7fa",
                width: "fit-content",
                height: "fit-content",
                textDecoration: "none",
                color: "#fff",
                padding: "1rem 1.5rem",
                borderRadius: "3px",
                border: "none",
                fontSize: "1.8rem",
                cursor: "pointer",
                transition: "all .2s ease",
                "&:hover": {
                    backgroundColor: "#1985d8",
                },
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default MainButton;
