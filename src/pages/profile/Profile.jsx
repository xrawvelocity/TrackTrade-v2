import ContentWrapper from "components/ContentWrapper";
import Flex from "components/Flex";
import ProtectedRoute from "components/ProtectedRoute";
import SubSideBar from "components/SubSidebar";
import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import Ideas from "./Ideas";
import Trades from "./Trades";
import Stats from "./Stats";
import Connections from "./Connections";
import { useAuth } from "../../context/authCtx";
import { Typography } from "@mui/material";

import userDefault from "../../images/userdefault.png";
import { Box } from "@mui/system";

// redux imports
const Profile = (props) => {
    const { currentUser, getUserData, userData } = useAuth();
    useEffect(() => {
        getUserData();
        console.log(userData);
    }, []);
    // getUserData();
    const subSideBarObj = [
        {
            text: "Ideas",
            url: "ideas",
        },
        {
            text: "Trades",
            url: "trades",
        },
        {
            text: "Stats",
            url: "stats",
        },
        {
            text: "Connections",
            url: "connections",
        },
    ];

    const loadAvatar = () => {
        return (
            <img
                style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    zIndex: "-20",
                }}
                src={userData.avatar ? userData.avatar : userDefault}
                alt="Avatar"
            />
        );
    };

    const RightComponent = () => {
        return (
            <Flex sx={{ alignItems: "center" }}>
                <Typography sx={{ fontSize: "2rem", mr: "2rem" }}>
                    {userData?.username}
                </Typography>
                <Box
                    sx={{
                        borderRadius: "50%",
                        border: "none",
                        height: "60px",
                        width: "60px",
                        backgroundColor: "#ccc",
                        overflow: "hidden",

                        "&:hover": {
                            "& > div": {
                                transform: "translateY(-7rem)",
                                zIndex: "3",
                                cursor: "pointer",
                            },
                        },
                    }}
                >
                    {loadAvatar()}
                    <Box
                        sx={{
                            backgroundColor: "rgba(34, 34, 34, 0.8)",
                            color: "#fff",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            padding: "2rem auto",
                            transform: "translateY(10rem)",
                            transition: "all 0.2s ease-in-out",
                            zIndex: "100",
                        }}
                    >
                        <form style={{ padding: "2rem 1rem" }}>
                            <label style={{ cursor: "pointer" }} htmlFor="img">
                                Change Avatar
                            </label>
                            <input
                                style={{ display: "none" }}
                                // onChange={handleSubmit}
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                            />
                        </form>
                    </Box>
                </Box>
            </Flex>
        );
    };

    return (
        <Flex>
            <SubSideBar header="Profile" obj={subSideBarObj} loc="profile" />
            <ContentWrapper contentStyle={{ padding: "30px 50px 60px 300px" }}>
                <Switch>
                    <ProtectedRoute path="/profile/ideas">
                        <Ideas RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/trades">
                        <Trades RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/stats">
                        <Stats RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/connections">
                        <Connections RightComponent={RightComponent} />
                    </ProtectedRoute>
                </Switch>
            </ContentWrapper>
        </Flex>
    );
};

export default Profile;
