import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";

const MainButton = ({ children, loading, onClick, sx, ...props }) => {
    return (
        <LoadingButton
            disableRipple
            disableElevation
            loading={loading}
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
                ...sx,
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </LoadingButton>
    );
};

export default MainButton;
