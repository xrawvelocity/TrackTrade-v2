import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loading = ({ sx }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...sx,
            }}
        >
            <CircularProgress size={52} />
        </Box>
    );
};

export default Loading;
