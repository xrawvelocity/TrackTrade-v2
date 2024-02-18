import { Grid, Typography } from "@mui/material";
import TraderCard from "components/cards/TraderCard";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import Toolbar from "components/partials/Toolbar";
import { useAuth } from "context/authCtx";
import { getAllConnections } from "../../firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Connections = ({ RightComponent }) => {
    const history = useHistory();
    const { getUserData, userData } = useAuth();
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order

    useAsyncEffect(async () => {
        await getUserData();
        const res = await getAllConnections(userData.connections);
        setConnections(res);
        setFilteredConnections(res);
        setLoading(false);
    }, []);

    const searchConnections = (searchTerm) => {
        console.log("searchTerm: ", searchTerm);
        const filtered = connections.filter((connection) =>
            connection.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredConnections(filtered);
    };

    const sortConnections = () => {
        const sorted = [...filteredConnections];
        sorted.sort((a, b) => {
            const nameA = a.username.toLowerCase();
            const nameB = b.username.toLowerCase();
            return sortOrder === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });

        setFilteredConnections(sorted);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    };

    const loadContent = () => {
        if (filteredConnections.length) {
            return (
                <Grid container spacing={3}>
                    {filteredConnections.map((each) => (
                        <Grid item xs={2.5} key={each.id}>
                            <TraderCard trader={each} />
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
                onSearch={searchConnections}
                searchPlaceholder={"Search for traders by their username..."}
                onSort={sortConnections}
                sortOptions={[
                    { label: "A-Z", value: "asc" },
                    { label: "Z-A", value: "desc" },
                ]}
                onButton={() => history.push("/browse/all-traders")}
                buttonText="View All Traders"
            />
            {loading ? <Loading /> : loadContent()}
        </>
    );
};

export default Connections;
