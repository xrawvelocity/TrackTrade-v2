import { Grid } from "@mui/material";
import HeaderText from "components/HeaderText";
import Loading from "components/Loading";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/Toolbar";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import { getAllIdeas } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Ideas = ({ RightComponent }) => {
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const [tradeIdeas, setTradeIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useAsyncEffect(async () => {
        const res = await getAllIdeas();
        setTradeIdeas(res);
        setLoading(false);
    }, []);

    const loadIdeas = () => {
        return (
            <Grid container spacing={3}>
                {tradeIdeas.map((each) => {
                    return (
                        <Grid item xs={3}>
                            <TradeIdeaCard tradeIdea={each} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    return (
        <div>
            <HeaderText value="Your Ideas" RightComponent={RightComponent} />
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
                buttonText="Post Idea"
            />
            {loading ? <Loading /> : loadIdeas()}
            <PostIdeaModal
                open={postIdeaOpen}
                onClose={() => setPostIdeaOpen(false)}
                onSubmit={() => null}
            />
        </div>
    );
};

export default Ideas;
