import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContentWrapper from "components/ContentWrapper";
import Flex from "components/Flex";
import ProtectedRoute from "components/ProtectedRoute";
import SubSideBar from "components/SubSidebar";
import UserAvatar from "components/UserAvatar";
import { getTraderById, updateAvatar, uploadImage } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Switch } from "react-router-dom";

import { useAuth } from "../../context/authCtx";
import Connections from "./Connections";
import Ideas from "./Ideas";
import Stats from "./Stats";
import Trades from "./Trades";

const Profile = () => {
    const { currentUser, getUserData, userData } = useAuth();
    const [imageUrl, setImageUrl] = useState("");
    const [progress, setProgress] = useState(null);

    const params = useParams();

    const isProfile = currentUser.uid === params.userId;

    useAsyncEffect(async () => {
        if (isProfile) {
            getUserData();
        } else {
            const res = getTraderById(params.userId);
            console.log(res);
        }
    }, [isProfile]);

    useAsyncEffect(async () => {
        if (progress === 100) {
            await updateAvatar(currentUser.uid, imageUrl, userData.avatar);
            getUserData();
        }
    }, [progress]);

    const subSideBarObj = isProfile
        ? [
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
          ]
        : [
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
          ];

    const handleImage = async (file) => {
        await uploadImage(
            file,
            `/files/${currentUser.uid}/avatar/${file.name}`,
            setProgress,
            setImageUrl
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
                    <UserAvatar
                        imageUrl={
                            progress && progress !== 100
                                ? "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                                : userData.avatar
                        }
                    />
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
                                onChange={(e) => {
                                    handleImage(e.target.files[0]);
                                }}
                                type="file"
                                id="img"
                                name="img"
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </form>
                    </Box>
                </Box>
            </Flex>
        );
    };

    return (
        <Flex>
            <SubSideBar
                header="Profile"
                obj={subSideBarObj}
                loc={`profile/${params.userOd}`}
            />
            <ContentWrapper contentStyle={{ padding: "30px 50px 60px 300px" }}>
                <Switch>
                    <ProtectedRoute path="/profile/:userId/ideas">
                        <Ideas RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/:userId/trades">
                        <Trades RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/:userId/stats">
                        <Stats RightComponent={RightComponent} />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/:userId/connections">
                        <Connections RightComponent={RightComponent} />
                    </ProtectedRoute>
                </Switch>
            </ContentWrapper>
        </Flex>
    );
};

export default Profile;
