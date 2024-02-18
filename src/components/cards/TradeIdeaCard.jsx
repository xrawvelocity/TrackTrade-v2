import { Divider, Paper, Typography } from "@mui/material";
import UserAvatar from "components/partials/UserAvatar";
import { useAuth } from "context/authCtx";
import { COLORS } from "enums/colors";
import { getTraderById } from "../../firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import moment from "moment";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import Flex from "../partials/Flex";

const TradeIdeaCard = ({ tradeIdea, ...props }) => {
    const {
        type,
        currency,
        risk,
        stopLoss,
        entry,
        takeProfit1,
        takeProfit2,
        description,
        imageUrl,
        trader,
        createdAt,
        riskReward,
    } = tradeIdea;
    const [user, setUser] = useState({});
    const { userData } = useAuth();

    const params = useParams();

    const location = useLocation();

    const isProfile = location.pathname.includes("profile");

    useAsyncEffect(async () => {
        let res = await getTraderById(tradeIdea.trader);
        if (params.userId === userData.uid) {
            await setUser(userData);
        } else {
            await setUser(res);
        }
    }, [tradeIdea]);

    return (
        <>
            <Paper elevation={4}>
                <Flex sx={{ flexDirection: "column" }}>
                    <div>
                        <Flex
                            sx={{
                                p: "2rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Flex sx={{ alignItems: "center" }}>
                                <Typography
                                    sx={{
                                        fontSize: "2.2rem",
                                        fontWeight: "700",

                                        color:
                                            type === "sell"
                                                ? "#e74c3c"
                                                : "#01b574",
                                    }}
                                >
                                    {type.toUpperCase()}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2rem",
                                        fontWeight: "500",
                                        ml: "2rem",
                                    }}
                                >
                                    {currency}
                                </Typography>
                            </Flex>
                            {isProfile ? null : (
                                <Flex
                                    sx={{
                                        alignItems: "center",
                                        cursor: "pointer",

                                        "&:hover": {
                                            "& > p": {
                                                color: "#1985d8",
                                            },
                                        },
                                    }}
                                    component={Link}
                                    to={`/profile/${user.uid}/ideas`}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "2rem",
                                            fontWeight: "500",
                                            mr: "2rem",
                                            color: "#f3f3f3",
                                        }}
                                    >
                                        {user.username}
                                    </Typography>
                                    <UserAvatar
                                        imageUrl={user.avatar}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            zIndex: "20",
                                        }}
                                    />
                                </Flex>
                            )}
                        </Flex>
                        <Divider />
                    </div>
                    {imageUrl && (
                        <Flex sx={{ height: "250px", width: "100%" }}>
                            <img
                                src={imageUrl}
                                alt="Trade Idea Image"
                                style={{ objectFit: "cover", width: "100%" }}
                            />
                            <Divider />
                        </Flex>
                    )}
                    <Flex>
                        <Flex sx={{ flexDirection: "column" }}>
                            <Flex
                                sx={{
                                    alignItems: "center",
                                    p: "2rem",
                                    pb: ".5rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Entry:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {entry}
                                </Typography>
                            </Flex>
                            <Flex
                                sx={{ alignItems: "center", p: ".5rem 2rem" }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Stop Loss:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {stopLoss}
                                </Typography>
                            </Flex>
                            <Flex
                                sx={{ alignItems: "center", p: ".5rem 2rem" }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Take Profit 1:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {takeProfit1}
                                </Typography>
                            </Flex>
                            {takeProfit2 && (
                                <Flex
                                    sx={{
                                        alignItems: "center",
                                        p: ".5rem 2rem 2rem",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.6rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Take Profit 2:
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                    >
                                        {takeProfit2}
                                    </Typography>
                                </Flex>
                            )}

                            {/* <Divider /> */}
                        </Flex>
                        <Flex sx={{ flexDirection: "column" }}>
                            <Flex
                                sx={{
                                    alignItems: "center",
                                    p: ".5rem 2rem",
                                    pt: "2rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Published:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {moment(createdAt).format(
                                        "dddd, MMM Do YYYY"
                                    )}
                                </Typography>
                            </Flex>

                            <Flex
                                sx={{ alignItems: "center", p: ".5rem 2rem" }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Risk to Reward:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {Number(riskReward)?.toFixed(2)}
                                </Typography>
                            </Flex>
                            <Flex
                                sx={{
                                    alignItems: "center",
                                    p: ".5rem 2rem",
                                    pb: "2rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Risk Level:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {risk[0].toUpperCase() + risk.substring(1)}
                                </Typography>
                            </Flex>
                            {false && (
                                <Flex
                                    sx={{
                                        flexDirection: "column",
                                        p: ".5rem 2rem",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.6rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Description:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "1.6rem",
                                            maxWidth: "250px",
                                        }}
                                    >
                                        {description}
                                    </Typography>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                    {/* here would go the liking, commenting, and sharing buttons */}
                </Flex>
            </Paper>
        </>
    );
};

export default TradeIdeaCard;
