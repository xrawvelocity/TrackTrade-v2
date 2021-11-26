import { Button } from "@mui/material";
import React from "react";

const MainButton = ({ children, onClick, ...props }) => {
    return (
        <Button
            disableRipple
            disableElevation
            sx={{
                backgroundColor: "#2ba7fa",
                width: "fit-content",
                height: "fit-content",
                textDecoration: "none",
                color: "#fff",
                padding: "1rem 1.5rem",
                lineHeight: "1.5",
                borderRadius: "3px",
                border: "none",
                fontSize: "1.8rem",
                boxShadow: "none",
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
        </Button>
    );
};

export default MainButton;
