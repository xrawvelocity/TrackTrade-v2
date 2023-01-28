import { Divider, Paper, Typography } from "@mui/material";
import MainButton from "components/buttons/MainButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import Flex from "components/partials/Flex";
import UserAvatar from "components/partials/UserAvatar";
import { useAuth } from "context/authCtx";
import {
    addConnection,
    getUserTrades,
    removeConnection,
} from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { calculateWinLoss } from "utils/tradeStats";

const TraderCard = ({ trader }) => {
    const { username, avatar, createdAt, uid } = trader;
    const { getUserData, userData } = useAuth();
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectLoading, setConnectLoading] = useState("");

    const history = useHistory();

    useAsyncEffect(async () => {
        await getUserData();
        const res = await getUserTrades(uid);
        setTrades(res);
        setLoading(false);
    }, []);

    const handleAddConnection = async (otherId) => {
        setConnectLoading(otherId);
        await addConnection(userData.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

    const handleRemoveConnection = async (otherId) => {
        setConnectLoading(otherId);
        await removeConnection(userData.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

    if (!loading) {
        return (
            <Paper elevation={4}>
                <Flex sx={{ flexDirection: "column" }}>
                    <div>
                        <Flex sx={{ alignItems: "center", p: "2rem" }}>
                            <UserAvatar
                                imageUrl={avatar}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    zIndex: "20",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "2rem",
                                    fontWeight: "500",
                                    ml: "2rem",
                                    color: "#f3f3f3",
                                }}
                            >
                                {username}
                            </Typography>
                        </Flex>
                        <Divider />
                    </div>
                    <Flex sx={{ flexDirection: "column" }}>
                        <Flex
                            sx={{ alignItems: "center", p: "2rem", pb: "1rem" }}
                        >
                            <Typography
                                sx={{ fontSize: "1.6rem", fontWeight: "500" }}
                            >
                                Joined:
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", ml: "1rem" }}>
                                {moment(createdAt).format("dddd, MMM Do YYYY")}
                            </Typography>
                        </Flex>
                        <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                            <Typography
                                sx={{ fontSize: "1.6rem", fontWeight: "500" }}
                            >
                                Win/Loss Ratio:
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", ml: "1rem" }}>
                                {calculateWinLoss(trades)}%
                            </Typography>
                        </Flex>
                        <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                            <Typography
                                sx={{ fontSize: "1.6rem", fontWeight: "500" }}
                            >
                                Total Trades:
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", ml: "1rem" }}>
                                {trades.length}
                            </Typography>
                        </Flex>
                        <Flex
                            sx={{
                                alignItems: "center",
                                p: "1rem 2rem",
                                pb: "2rem",
                            }}
                        >
                            <Typography
                                sx={{ fontSize: "1.6rem", fontWeight: "500" }}
                            >
                                Best Currency:
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", ml: "1rem" }}>
                                WIP
                            </Typography>
                        </Flex>
                        <Divider />
                    </Flex>
                    <Flex
                        sx={{
                            width: "100%",
                            justifyContent: "center",
                            p: "2rem",
                        }}
                    >
                        <Flex>
                            {userData.connections.includes(uid) ? (
                                <MainButton
                                    loading={connectLoading === uid}
                                    onClick={() => handleRemoveConnection(uid)}
                                    sx={{
                                        fontSize: "1.2rem",
                                        mr: "2rem",
                                        padding: "0.75rem 1.25rem 0.6rem",
                                    }}
                                >
                                    Disconnect
                                </MainButton>
                            ) : (
                                <MainButton
                                    loading={connectLoading === uid}
                                    onClick={() => handleAddConnection(uid)}
                                    sx={{
                                        fontSize: "1.2rem",
                                        mr: "2rem",
                                        padding: "0.75rem 1.25rem 0.6rem",
                                    }}
                                >
                                    Connect
                                </MainButton>
                            )}
                        </Flex>
                        <SecondaryButton
                            onClick={() =>
                                history.push(`/profile/${uid}/ideas`)
                            }
                            sx={{
                                fontSize: "1.2rem",
                                padding: "0.7rem 1.25rem 0.6rem",
                            }}
                        >
                            Visit
                        </SecondaryButton>
                    </Flex>
                </Flex>
            </Paper>
        );
    } else return null;
};

export default TraderCard;
