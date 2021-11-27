import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Flex from "./Flex";
const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "3rem",
        fontWeight: "600",
        color: "#000",
    },
}));
export default function HeaderText({ value, RightComponent }) {
    const classes = useStyles();
    return (
        <Flex
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "3rem",
            }}
        >
            <Typography className={classes.text} variant="h4">
                {value}
            </Typography>
            {RightComponent && <RightComponent />}
        </Flex>
    );
}
