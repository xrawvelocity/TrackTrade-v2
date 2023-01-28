import { Paper, Typography } from "@mui/material";
import PostIdeaModal from "components/modals/PostIdeaModal";
import PostTradeModal from "components/modals/PostTradeModal";
import ContentWrapper from "components/partials/ContentWrapper";
import Flex from "components/partials/Flex";
import Chart from "components/tools/Chart";
import News from "components/tools/News";
import { useAuth } from "context/authCtx";
import CurrencyPerformance from "components/charts/CurrencyPerformance";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const { currentUser } = useAuth();
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const [postTradeOpen, setPostTradeOpen] = useState(false);

    return (
        <ContentWrapper>
            <Flex sx={{ flexDirection: "column", marginLeft: "50px" }}>
                <Typography
                    sx={{ fontSize: "3rem", fontWeight: "600", mb: "3rem" }}
                >
                    Happy trading, {currentUser.email}
                </Typography>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <Paper
                        elevation={4}
                        id="tradingview-widget-container"
                        style={{ width: "70%", height: "400px" }}
                    >
                        <Chart />
                    </Paper>
                    <Flex
                        sx={{
                            flexDirection: "column",
                            width: "25%",
                            justifyContent: "space-between",
                            height: "400px",
                        }}
                    >
                        <Paper
                            elevation={4}
                            style={{
                                height: "205px",
                                width: "100%",
                                borderRadius: "3px",
                            }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.8rem",
                                        fontWeight: "600",
                                        py: "1rem",
                                    }}
                                >
                                    Quick Actions
                                </Typography>
                                <hr
                                    style={{
                                        background: "#ffffff50",
                                        height: "1px",
                                        width: "100%",
                                    }}
                                />
                                <Flex
                                    sx={{
                                        flexDirection: "column",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        onClick={() => setPostIdeaOpen(true)}
                                        sx={{
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: ".75rem 0",
                                        }}
                                        className="link-text"
                                    >
                                        Post Idea
                                    </Typography>

                                    <Typography
                                        onClick={() => setPostTradeOpen(true)}
                                        sx={{
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: ".75rem 0",
                                        }}
                                        className="link-text"
                                    >
                                        Post Trade
                                    </Typography>

                                    <Link
                                        to={`/profile/${currentUser.uid}/stats`}
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "2rem",
                                                textAlign: "center",
                                                padding: ".75rem 0 1.5rem",
                                            }}
                                            className="link-text"
                                        >
                                            View Stats
                                        </Typography>
                                    </Link>
                                </Flex>
                            </Flex>
                        </Paper>
                        <Paper
                            elevation={4}
                            style={{
                                height: "150px",
                                width: "100%",
                                borderRadius: "3px",
                            }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.2rem",
                                        fontWeight: "600",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Equity in the last 30 days
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "600",
                                        marginTop: "1rem",
                                        color: "#1abc9c",
                                    }}
                                >
                                    $1024.41
                                </Typography>
                            </Flex>
                        </Paper>
                    </Flex>
                </Flex>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <Paper
                        elevation={4}
                        style={{
                            width: "50%",
                            height: "370px",
                            marginTop: "5rem",
                        }}
                    >
                        <News />
                    </Paper>
                    <CurrencyPerformance />
                </Flex>
            </Flex>
            <PostIdeaModal
                open={postIdeaOpen}
                onClose={() => setPostIdeaOpen(false)}
            />
            <PostTradeModal
                open={postTradeOpen}
                onClose={() => setPostTradeOpen(false)}
            />
        </ContentWrapper>
    );
};
export default Dashboard;
