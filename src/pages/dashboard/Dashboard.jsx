import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomBar from "components/charts/Bar";
import ContentWrapper from "components/partials/ContentWrapper";
import Flex from "components/partials/Flex";
import { useAuth } from "context/authCtx";
import Chart from "components/tools/Chart";
import News from "components/tools/News";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostIdeaModal from "components/modals/PostIdeaModal";
import PostTradeModal from "components/modals/PostTradeModal";

const Dashboard = (props) => {
    const { currentUser } = useAuth();
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const [postTradeOpen, setPostTradeOpen] = useState(false);

    return (
        <ContentWrapper contentStyle={{ paddingTop: "30px" }}>
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
                                height: "200px",
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
                                        borderTop: "2px solid #22222225",
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
                                            color: "#1985d8",
                                            cursor: "pointer",
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: ".75rem 0",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        Post Idea
                                    </Typography>

                                    <Typography
                                        onClick={() => setPostTradeOpen(true)}
                                        sx={{
                                            color: "#1985d8",
                                            cursor: "pointer",
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: ".75rem 0",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        Post Trade
                                    </Typography>

                                    <Link
                                        to="/profile/stats"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#1985d8",
                                                fontSize: "2rem",
                                                textAlign: "center",
                                                padding: ".75rem 0",

                                                "&:hover": {
                                                    backgroundColor: "#eee",
                                                },
                                            }}
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
                                        color: "#2c1",
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
                            height: "395px",
                            marginTop: "6rem",
                        }}
                    >
                        <News />
                    </Paper>
                    <Paper
                        elevation={4}
                        style={{
                            height: "395px",
                            width: "45%",
                            borderRadius: "3px",
                            marginTop: "6rem",
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
                                    fontSize: "3rem",
                                    fontWeight: "600",
                                    margin: "2rem 0",
                                }}
                            >
                                Currency Performance
                            </Typography>
                            <Box
                                sx={{
                                    height: "300px",
                                    width: "100%",
                                    fontSize: "1.8rem",
                                }}
                            >
                                {/* <CustomPie /> */}
                                <CustomBar />
                            </Box>
                        </Flex>
                    </Paper>
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
