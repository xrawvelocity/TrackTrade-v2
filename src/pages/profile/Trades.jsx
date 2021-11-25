import HeaderText from "components/HeaderText";
import Toolbar from "components/Toolbar";
import React from "react";

const Trades = ({ RightComponent }) => {
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
                onButton={() => null}
                buttonText="Post Trade"
            />
        </div>
    );
};

export default Trades;
