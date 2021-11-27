import { Grid, Typography } from "@mui/material";
import TradeCard from "components/cards/TradeCard";
import Flex from "components/Flex";
import HeaderText from "components/HeaderText";
import Loading from "components/Loading";
import PostTradeModal from "components/modals/PostTradeModal";
import Toolbar from "components/Toolbar";
import { useAuth } from "context/authCtx";
import { getYourTrades } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";

const Trades = ({ RightComponent }) => {
    const [postTradeOpen, setPostTradeOpen] = useState(false);
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useAsyncEffect(async () => {
        const res = await getYourTrades(currentUser.uid);
        setTrades(res);
        setLoading(false);
    }, [postTradeOpen]);

    const loadContent = () => {
        if (trades.length) {
            return (
                <Grid container spacing={3}>
                    {trades.map((each) => {
                        return (
                            <Grid item xs={2}>
                                <TradeCard trade={each} />
                            </Grid>
                        );
                    })}
                </Grid>
            );
        } else {
            return (
                <Flex
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        mt: "25rem",
                    }}
                >
                    <Typography sx={{ fontSize: "2.2rem" }}>
                        No trades have been posted here yet
                    </Typography>
                </Flex>
            );
        }
    };

    return (
        <div>
            <HeaderText value="Your Trades" RightComponent={RightComponent} />
            <Toolbar
                // onSearch={this.searchTradeTrades}
                searchPlaceholder={"Search for trades by their symbol..."}
                // onSort={this.sortTradeTrades}
                sortOptions={[
                    { text: "Newest", value: "newest" },
                    { text: "Oldest", value: "oldest" },
                    { text: "Sells", value: "sell" },
                    { text: "Buys", value: "buy" },
                ]}
                onButton={() => setPostTradeOpen(true)}
                buttonText="Post Trade"
            />
            {loading ? <Loading sx={{ mt: "25rem" }} /> : loadContent()}
            <PostTradeModal
                open={postTradeOpen}
                onClose={() => setPostTradeOpen(false)}
            />
        </div>
    );
};

export default Trades;
