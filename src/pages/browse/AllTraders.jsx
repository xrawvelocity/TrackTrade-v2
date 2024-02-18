import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import TradeIdeaCard from "components/cards/TradeIdeaCard";
import TraderCard from "components/cards/TraderCard";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import Loading from "components/partials/Loading";
import MainButton from "components/buttons/MainButton";
import PostIdeaModal from "components/modals/PostIdeaModal";
import Toolbar from "components/partials/Toolbar";
import UserAvatar from "components/partials/UserAvatar";
import {
    addConnection,
    getAllTraders,
    getUserTrades,
    removeConnection,
} from "../../firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import moment from "moment";
import React, { useState } from "react";
import SecondaryButton from "components/buttons/SecondaryButton";
import { useAuth } from "context/authCtx";
import { useHistory } from "react-router";
import { calculateWinLoss } from "utils/tradeStats";

const AllTraders = () => {
    const [traders, setTraders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectLoading, setConnectLoading] = useState("");
    const { currentUser, getUserData, userData } = useAuth();

    const history = useHistory();

    const useStyles = makeStyles(() => ({
        dataGrid: {
            fontSize: "1.8rem",
        },
    }));

    const classes = useStyles();

    useAsyncEffect(async () => {
        const res = await getAllTraders();
        await setTraders(res);
        await getUserData();
        setLoading(false);
    }, []);

    const handleAddConnection = async (otherId) => {
        setConnectLoading(otherId);
        await addConnection(userData.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

    const handleRemoveConnection = async (otherId) => {
        setConnectLoading(otherId);
        await removeConnection(userData.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

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
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            renderCell: ({ value }) => {
                if (userData.username === value) {
                    return value + " " + "(you)";
                } else return value;
            },
        },
        {
            field: "createdAt",
            headerName: "User Since",
            flex: 1,
            renderCell: ({ value }) => {
                return moment(value).format("MM/DD/YYYY hh:mm A");
            },
        },
        { field: "winLoss", headerName: "Win Loss Ratio", flex: 0.75 },
        { field: "totalTrades", headerName: "Total Trades", flex: 0.75 },
        {
            field: "actions",
            headerName: "",
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row, value }) => {
                if (row.uid !== currentUser.uid) {
                    return (
                        <Flex
                            sx={{ width: "100%", justifyContent: "flex-start" }}
                        >
                            <Flex
                                sx={{
                                    width: "50%",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {userData.connections.includes(row.uid) ? (
                                    <MainButton
                                        loading={connectLoading === row.uid}
                                        onClick={() =>
                                            handleRemoveConnection(row.uid)
                                        }
                                        sx={{
                                            fontSize: "1.2rem",
                                            mr: "2rem",
                                            padding: "0.75rem 1.25rem 0.6rem",
                                        }}
                                    >
                                        Disconnect
                                    </MainButton>
                                ) : (
                                    <MainButton
                                        loading={connectLoading === row.uid}
                                        onClick={() =>
                                            handleAddConnection(row.uid)
                                        }
                                        sx={{
                                            fontSize: "1.2rem",
                                            mr: "2rem",
                                            padding: "0.75rem 1.25rem 0.6rem",
                                        }}
                                    >
                                        Connect
                                    </MainButton>
                                )}
                            </Flex>
                            <SecondaryButton
                                onClick={() =>
                                    history.push(`/profile/${row.uid}/ideas`)
                                }
                                sx={{
                                    fontSize: "1.2rem",
                                    padding: "0.7rem 1.25rem 0.6rem",
                                }}
                            >
                                Visit
                            </SecondaryButton>
                        </Flex>
                    );
                } else return null;
            },
        },
    ];

    return (
        <>
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
                        getRowId={(row) => row.uid}
                        rows={traders}
                    />
                </Paper>
            )}
        </>
    );
};

export default AllTraders;
