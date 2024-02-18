import React from "react";

const Logo = () => {
    return (
        <div
            style={{
                height: "35px",
                width: "35px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "1rem",
                fontSize: "2rem",
                fontWeight: "900",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                letterSpacing: "-1px",
                color: "#081c24",
                cursor: "default",
            }}
        >
            <span style={{ color: "#01b574" }}>T</span>
            <span style={{ color: "#e74c3c" }}>T</span>
        </div>
    );
};

export default Logo;
