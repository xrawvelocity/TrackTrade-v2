import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import TraderCard from "components/cards/TraderCard";
import HeaderText from "components/HeaderText";
import Loading from "components/Loading";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/Toolbar";
import UserAvatar from "components/UserAvatar";
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
            headerName: "Avatar",
            flex: 0.5,
            renderCell: ({ value }) => {
                return (
                    <UserAvatar
                        imageUrl={value}
                        style={{ width: "40px", height: "40px", zIndex: "20" }}
                    />
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
        { field: "actions", headerName: "Actions", flex: 0.5 },
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
