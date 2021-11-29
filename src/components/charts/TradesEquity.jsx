import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomBar from "components/charts/Bar";
import Flex from "components/partials/Flex";
import React, { useState } from "react";
import CustomLine from "./Line";

const TradesEquity = ({ paperStyles }) => {
    return (
        <Paper
            elevation={4}
            sx={{
                height: "395px",
                width: "45%",
                borderRadius: "3px",
                marginTop: "6rem",
                ...paperStyles,
            }}
        >
            <Flex
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "2.4rem",
                        fontWeight: "500",
                        margin: "2rem 0",
                    }}
                >
                    Trades Equity
                </Typography>
                <Box
                    sx={{
                        height: "300px",
                        width: "100%",
                        fontSize: "1.8rem",
                    }}
                >
                    <CustomLine />
                </Box>
            </Flex>
        </Paper>
    );
};

export default TradesEquity;
