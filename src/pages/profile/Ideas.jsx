import { Grid, Typography } from "@mui/material";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/partials/Toolbar";
import { useAuth } from "context/authCtx";
import { getUserIdeas } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { useParams } from "react-router";

const Ideas = ({ RightComponent, isProfile, otherUser }) => {
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const [tradeIdeas, setTradeIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const params = useParams();

    useAsyncEffect(async () => {
        const res = await getUserIdeas(params.userId);
        setTradeIdeas(res);
        setLoading(false);
    }, [postIdeaOpen]);

    const loadContent = () => {
        if (tradeIdeas.length) {
            return (
                <Grid container spacing={3}>
                    {tradeIdeas.map((each) => {
                        return (
                            <Grid item xs={2.5}>
                                <TradeIdeaCard tradeIdea={each} />
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
                // onSearch={this.searchTradeIdeas}
                searchPlaceholder={"Search for trade ideas by their symbol..."}
                // onSort={this.sortTradeIdeas}
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
