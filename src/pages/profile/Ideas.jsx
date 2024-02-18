import { Grid, Typography } from "@mui/material";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/partials/Toolbar";
import { getUserIdeas } from "../../firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";

const filterAndSortIdeas = (tradeIdeas, searchTerm, sortOption) => {
    let filteredIdeas = tradeIdeas.slice();

    if (searchTerm) {
        filteredIdeas = filteredIdeas.filter((idea) =>
            idea.currency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (sortOption === "newest") {
        filteredIdeas.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOption === "oldest") {
        filteredIdeas.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortOption === "sell") {
        filteredIdeas = filteredIdeas.filter((idea) => idea.type === "sell");
    } else if (sortOption === "buy") {
        filteredIdeas = filteredIdeas.filter((idea) => idea.type === "buy");
    }

    return filteredIdeas;
};

const Ideas = ({ RightComponent, isProfile, otherUser }) => {
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const [tradeIdeas, setTradeIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

    const params = useParams();

    useAsyncEffect(async () => {
        const res = await getUserIdeas(params.userId);
        setTradeIdeas(res);
        setLoading(false);
    }, [postIdeaOpen]);

    const filteredAndSortedIdeas = useMemo(() => {
        return filterAndSortIdeas(tradeIdeas, searchTerm, sortOption);
    }, [tradeIdeas, searchTerm, sortOption]);

    const loadContent = () => {
        if (filteredAndSortedIdeas.length) {
            return (
                <Grid container spacing={3}>
                    {filteredAndSortedIdeas.map((each) => (
                        <Grid item xs={4} key={each.ideaId}>
                            <TradeIdeaCard tradeIdea={each} />
                        </Grid>
                    ))}
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
                        No trade ideas have been posted here yet
                    </Typography>
                </Flex>
            );
        }
    };

    return (
        <>
            <HeaderText
                value={
                    isProfile ? "Your Ideas" : `${otherUser.username}'s Ideas`
                }
                RightComponent={RightComponent}
            />
            <Toolbar
                onSearch={(value) => setSearchTerm(value)}
                onSort={(value) => setSortOption(value)}
                searchPlaceholder={"Search for trade ideas by their symbol..."}
                sortOptions={[
                    { text: "Newest", value: "newest" },
                    { text: "Oldest", value: "oldest" },
                    { text: "Sells", value: "sell" },
                    { text: "Buys", value: "buy" },
                ]}
                onButton={() => setPostIdeaOpen(true)}
                buttonText={isProfile ? "Post Idea" : ""}
            />
            {loading ? <Loading /> : loadContent()}
            <PostIdeaModal
                open={postIdeaOpen}
                onClose={() => setPostIdeaOpen(false)}
            />
        </>
    );
};

export default Ideas;
