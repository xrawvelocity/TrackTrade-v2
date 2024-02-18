import { Grid, Typography } from "@mui/material";
import TradeCard from "components/cards/TradeCard";
import PostTradeModal from "components/modals/PostTradeModal";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import Toolbar from "components/partials/Toolbar";
import { getUserTrades } from "../../firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";

const filterAndSortTrades = (trades, searchTerm, sortOption) => {
    let filteredTrades = trades;

    // Filter by search term
    if (searchTerm) {
        filteredTrades = filteredTrades.filter((trade) =>
            trade.currency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Sort
    if (sortOption === "newest") {
        filteredTrades.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOption === "oldest") {
        filteredTrades.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortOption === "sell") {
        filteredTrades = filteredTrades.filter(
            (trade) => trade.type === "sell"
        );
    } else if (sortOption === "buy") {
        filteredTrades = filteredTrades.filter((trade) => trade.type === "buy");
    }

    return filteredTrades;
};

const Trades = ({ RightComponent, isProfile, otherUser }) => {
    const [postTradeOpen, setPostTradeOpen] = useState(false);
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

    const params = useParams();

    useAsyncEffect(async () => {
        const res = await getUserTrades(params.userId);
        setTrades(res);
        setLoading(false);
    }, [postTradeOpen]);

    const filteredAndSortedTrades = useMemo(() => {
        return filterAndSortTrades(trades, searchTerm, sortOption);
    }, [trades, searchTerm, sortOption]);

    const loadContent = () => {
        if (filteredAndSortedTrades.length) {
            return (
                <Grid container spacing={3}>
                    {filteredAndSortedTrades.map((each) => {
                        return (
                            <Grid item xs={4}>
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
        <>
            <HeaderText
                value={
                    isProfile ? "Your Trades" : `${otherUser.username}'s Trades`
                }
                RightComponent={RightComponent}
            />
            <Toolbar
                onSearch={setSearchTerm}
                onSort={setSortOption}
                searchPlaceholder={"Search for trades by their symbol..."}
                sortOptions={[
                    { text: "Newest", value: "newest" },
                    { text: "Oldest", value: "oldest" },
                    { text: "Sells", value: "sell" },
                    { text: "Buys", value: "buy" },
                ]}
                onButton={() => setPostTradeOpen(true)}
                buttonText={isProfile ? "Post Trade" : ""}
            />
            {loading ? <Loading /> : loadContent()}
            <PostTradeModal
                open={postTradeOpen}
                onClose={() => setPostTradeOpen(false)}
            />
        </>
    );
};

export default Trades;
