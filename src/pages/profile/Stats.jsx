import HeaderText from "components/partials/HeaderText";
import Toolbar from "components/partials/Toolbar";
import React from "react";

const Stats = ({ RightComponent }) => {
    return (
        <div>
            <HeaderText value="Your Stats" RightComponent={RightComponent} />
        </div>
    );
};

export default Stats;
