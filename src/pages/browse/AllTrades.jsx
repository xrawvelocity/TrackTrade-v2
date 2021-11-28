import { Grid } from "@mui/material";
import TradeCard from "components/cards/TradeCard";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/Loading";
import PostTradeModal from "components/modals/PostTradeModal";
import Toolbar from "components/Toolbar";
import { getAllTrades } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";

const AllTrades = () => {
    const [postTradeOpen, setPostTradeOpen] = useState(false);
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useAsyncEffect(async () => {
        const res = await getAllTrades();
        setTrades(res);
        setLoading(false);
    }, []);

    const loadContent = () => {
        return (
            <Grid container spacing={3}>
                {trades.map((each) => {
                    return (
                        <Grid item xs={2.5}>
                            <TradeCard trade={each} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    return (
        <div>
            <HeaderText value="All Trades" />
            <Toolbar
                // onSearch={this.searchTradeIdeas}
                searchPlaceholder={"Search for trade by their symbol..."}
                // onSort={this.sortTradeIdeas}
                sortOptions={[
                    { text: "Newest", value: "newest" },
                    { text: "Oldest", value: "oldest" },
                    { text: "Sells", value: "sell" },
                    { text: "Buys", value: "buy" },
                ]}
                onButton={() => setPostTradeOpen(true)}
                buttonText="Post Trade"
            />
            {loading ? <Loading /> : loadContent()}
            <PostTradeModal
                open={postTradeOpen}
                onClose={() => setPostTradeOpen(false)}
            />
        </div>
    );
};

export default AllTrades;
