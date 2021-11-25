import HeaderText from "components/HeaderText";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/Toolbar";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Ideas = ({ RightComponent }) => {
    const [postIdeaOpen, setPostIdeaOpen] = useState(false);
    const history = useHistory();
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
            <PostIdeaModal
                open={postIdeaOpen}
                onClose={() => setPostIdeaOpen(false)}
                onSubmit={() => null}
            />
        </div>
    );
};

export default Ideas;
