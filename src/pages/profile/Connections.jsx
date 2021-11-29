import { Grid, Typography } from "@mui/material";
import TraderCard from "components/cards/TraderCard";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import Toolbar from "components/partials/Toolbar";
import { useAuth } from "context/authCtx";
import { getAllConnections } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Connections = ({ RightComponent }) => {
    const history = useHistory();
    const { getUserData, userData } = useAuth();
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);

    useAsyncEffect(async () => {
        await getUserData();
        const res = await getAllConnections(userData.connections);
        setConnections(res);
        setLoading(false);
    }, []);

    const loadContent = () => {
        if (connections.length) {
            return (
                <Grid container spacing={3}>
                    {connections.map((each) => {
                        return (
                            <Grid item xs={2.5}>
                                <TraderCard trader={each} />
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
                        You have no friends :( view all traders to add them here
                    </Typography>
                </Flex>
            );
        }
    };

    return (
        <>
            <HeaderText
                value="Your Connections"
                RightComponent={RightComponent}
            />
            <Toolbar
                // onSearch={this.searchTradeTrades}
                searchPlaceholder={"Search for traders by their username..."}
                // onSort={this.sortTradeTrades}
                sortOptions={[]}
                onButton={() => history.push("/browse/all-traders")}
                buttonText="View All Traders"
            />
            {loading ? <Loading /> : loadContent()}
        </>
    );
};

export default Connections;
