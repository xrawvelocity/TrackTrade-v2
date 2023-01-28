import { LoadingButton } from "@mui/lab";
import React from "react";

const SecondaryButton = ({ children, onClick, sx, ...props }) => {
    return (
        <LoadingButton
            disableRipple
            disableElevation
            variant="outlined"
            sx={{
                borderColor: "#ffffff70",
                width: "fit-content",
                height: "fit-content",
                textDecoration: "none",
                color: "#fff",
                padding: "0.9rem 1.5rem",
                lineHeight: "1.5",
                borderRadius: "3px",
                fontSize: "1.8rem",
                boxShadow: "none",
                cursor: "pointer",
                transition: "all .2s ease",
                "&:hover": {
                    borderColor: "#1985d8",
                    color: "#2ba7fa",
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

export default SecondaryButton;
