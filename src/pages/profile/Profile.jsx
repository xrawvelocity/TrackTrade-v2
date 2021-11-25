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
        return userData.avatar ? (
            <img
                className="profile-nav__user-avatar__image"
                src={userData.avatar}
                alt="Avatar"
            />
        ) : (
            <img
                className="profile-nav__user-avatar__image"
                src={userDefault}
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
                <div className="profile-nav__user-avatar">
                    {loadAvatar()}
                    <div className="profile-nav__user-avatar__change">
                        <form className="profile-nav__user-avatar__change-form">
                            <label
                                className="profile-nav__user-avatar__change-form--label"
                                htmlFor="img"
                            >
                                Change Avatar
                            </label>
                            <input
                                className="profile-nav__user-avatar__change-form--input"
                                // onChange={handleSubmit}
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                            />
                        </form>
                    </div>
                </div>
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
