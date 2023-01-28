import { Paper, Typography } from "@mui/material";
import CurrencyPerformance from "components/charts/CurrencyPerformance";
import TradesEquity from "components/charts/TradesEquity";
import WinLossRatio from "components/charts/WinLossRatio";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import { getUserTrades } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { useParams } from "react-router";
import { calculateWinLoss } from "utils/tradeStats";
import LinkText from "components/buttons/LinkText";

const Stats = ({ RightComponent, isProfile, otherUser }) => {
    const [loading, setLoading] = useState(true);
    const [trades, setTrades] = useState([]);
    const [winLoss, setWinLoss] = useState(0);

    const params = useParams();

    useAsyncEffect(async () => {
        const res = await getUserTrades(params.userId);
        await setTrades(res);
        setWinLoss(calculateWinLoss(trades));
        setLoading(false);
    }, []);

    return (
        <>
            <HeaderText
                value={
                    isProfile ? "Your Stats" : `${otherUser.username}'s Stats`
                }
                RightComponent={RightComponent}
            />
            <Flex sx={{ flexDirection: "column" }}>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <TradesEquity paperStyles={{ mt: "0", width: "60%" }} />
                    <WinLossRatio paperStyles={{ mt: "0", width: "35%" }} />
                </Flex>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <CurrencyPerformance paperStyles={{ width: "60%" }} />
                    <Flex
                        sx={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            mt: "6rem",
                            width: "35%",
                        }}
                    >
                        <Paper sx={{ height: "45%" }} elevation={4}>
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    height: "100%",
                                    pt: "1rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Largest Profit
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "600",
                                        color: "#1abc9c",
                                    }}
                                >
                                    $1272.43
                                </Typography>
                                <LinkText sx={{ fontSize: "1.6rem" }}>
                                    View Trade
                                </LinkText>
                            </Flex>
                        </Paper>
                        <Paper sx={{ height: "45%" }} elevation={4}>
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    height: "100%",
                                    pt: "1rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Largest Drawdown
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "600",
                                        color: "#e74c3c",
                                    }}
                                >
                                    $736.12
                                </Typography>
                                <LinkText sx={{ fontSize: "1.6rem" }}>
                                    View Trade
                                </LinkText>
                            </Flex>
                        </Paper>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Stats;
