import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import TraderCard from "components/cards/TraderCard";
import Flex from "components/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/Loading";
import MainButton from "components/buttons/MainButton";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/Toolbar";
import UserAvatar from "components/partials/UserAvatar";
import { getAllTraders } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import moment from "moment";
import React, { useState } from "react";

const AllTraders = () => {
    const [traders, setTraders] = useState([]);
    const [loading, setLoading] = useState(true);

    const useStyles = makeStyles(() => ({
        dataGrid: {
            fontSize: "1.8rem",
        },
    }));

    const classes = useStyles();

    useAsyncEffect(async () => {
        const res = await getAllTraders();
        setTraders(res);
        setLoading(false);
    }, []);

    const columns = [
        {
            field: "avatar",
            headerName: "",
            sortable: false,
            disableColumnMenu: true,
            flex: 0.25,
            renderCell: ({ value }) => {
                return (
                    <Flex sx={{ width: "100%", justifyContent: "center" }}>
                        <UserAvatar
                            imageUrl={value}
                            style={{
                                width: "35px",
                                height: "35px",
                                zIndex: "20",
                            }}
                        />
                    </Flex>
                );
            },
        },
        { field: "username", headerName: "Username", flex: 1 },
        {
            field: "createdAt",
            headerName: "User Since",
            flex: 1,
            renderCell: ({ value }) => {
                return moment(value).format("MM/DD/YYYY hh:mm A");
            },
        },
        { field: "winLoss", headerName: "Win Loss Ratio", flex: 1 },
        { field: "totalTrades", headerName: "Total Trades", flex: 1 },
        {
            field: "actions",
            headerName: "",
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row, value }) => {
                return (
                    <Flex>
                        <MainButton>Connect</MainButton>
                        <MainButton>Visit Profile</MainButton>
                    </Flex>
                );
            },
        },
    ];

    return (
        <div>
            <HeaderText value="All Traders" />
            <Toolbar
                // onSearch={this.searchTradeIdeas}
                searchPlaceholder={"Search for traders by their username..."}
                // onSort={this.sortTradeIdeas}
                sortOptions={[
                    { text: "Newest", value: "newest" },
                    { text: "Oldest", value: "oldest" },
                ]}
            />
            {loading ? (
                <Loading />
            ) : (
                <Paper sx={{ width: "100%", height: "600px" }}>
                    <DataGrid
                        className={classes.dataGrid}
                        disableSelectionOnClick
                        columns={columns}
                        rows={traders.map((each, index) => {
                            return { ...each, id: index };
                        })}
                    />
                </Paper>
            )}
        </div>
    );
};

export default AllTraders;
