import { LoadingButton } from "@mui/lab";
import React from "react";

const LinkText = ({ children, loading, onClick, sx, ...props }) => {
    return (
        <LoadingButton
            disableRipple
            disableElevation
            loading={loading}
            variant="text"
            sx={{
                width: "fit-content",
                height: "fit-content",
                textDecoration: "none",
                padding: "1rem 1.5rem",
                lineHeight: "1.5",
                borderRadius: "3px",
                border: "none",
                fontSize: "1.8rem",
                boxShadow: "none",
                cursor: "pointer",
                transition: "all .2s ease",
                color: "#1985d8",
                // "&:hover": {
                //     color: "#1985d8",
                // },
                ...sx,
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </LoadingButton>
    );
};

export default LinkText;
