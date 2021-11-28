import HeaderText from "components/partials/HeaderText";
import Toolbar from "components/Toolbar";
import React from "react";

const Connections = ({ RightComponent }) => {
    return (
        <div>
            <HeaderText
                value="Your Connections"
                RightComponent={RightComponent}
            />
            <Toolbar
                // onSearch={this.searchTradeTrades}
                searchPlaceholder={"Search for traders by their username..."}
                // onSort={this.sortTradeTrades}
                sortOptions={[]}
                onButton={() => null}
                buttonText="View All Traders"
            />
        </div>
    );
};

export default Connections;
