import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MainButton from "components/buttons/MainButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import ContentWrapper from "components/partials/ContentWrapper";
import Flex from "components/partials/Flex";
import HeaderText from "components/partials/HeaderText";
import ProtectedRoute from "components/partials/ProtectedRoute";
import SubSideBar from "components/partials/SubSidebar";
import UserAvatar from "components/partials/UserAvatar";
import {
    addConnection,
    getTraderById,
    removeConnection,
    updateAvatar,
    uploadImage,
} from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Switch } from "react-router-dom";

import { useAuth } from "../../context/authCtx";
import Connections from "./Connections";
import Ideas from "./Ideas";
import Stats from "./Stats";
import Trades from "./Trades";

const Profile = () => {
    const { currentUser, getUserData, userData } = useAuth();
    const [otherUser, setOtherUser] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [progress, setProgress] = useState(null);
    const [connectLoading, setConnectLoading] = useState("");

    const params = useParams();
    const history = useHistory();

    const isProfile = currentUser.uid === params.userId;

    useAsyncEffect(async () => {
        if (isProfile) {
            getUserData();
        } else {
            await getUserData();
            await getTraderById(params.userId).then((res) => setOtherUser(res));

            // await setOtherUser(res);
        }
    }, [isProfile]);

    useAsyncEffect(async () => {
        if (progress === 100 && imageUrl) {
            await updateAvatar(currentUser.uid, imageUrl, userData?.avatar);
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

    const handleAddConnection = async (otherId) => {
        setConnectLoading(otherId);
        await addConnection(userData?.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

    const handleRemoveConnection = async (otherId) => {
        setConnectLoading(otherId);
        await removeConnection(userData?.uid, otherId);
        await getUserData();
        setConnectLoading("");
    };

    const RightComponent = () => {
        return (
            <Flex sx={{ alignItems: "center" }}>
                {isProfile ? (
                    <Typography sx={{ fontSize: "2rem", mr: "2rem" }}>
                        {userData?.username}
                    </Typography>
                ) : (
                    <Flex sx={{ mr: "3rem" }}>
                        {userData?.connections.includes(otherUser.uid) ? (
                            <MainButton
                                loading={connectLoading === otherUser.uid}
                                onClick={() =>
                                    handleRemoveConnection(otherUser.uid)
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
                                loading={connectLoading === otherUser.uid}
                                onClick={() =>
                                    handleAddConnection(otherUser.uid)
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
                        <SecondaryButton
                            onClick={() =>
                                history.push(`/messages/${otherUser.uid}`)
                            }
                            sx={{
                                fontSize: "1.2rem",
                                padding: "0.7rem 1.25rem 0.6rem",
                            }}
                        >
                            Message
                        </SecondaryButton>
                    </Flex>
                )}
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
                                : isProfile
                                ? userData?.avatar
                                : otherUser.avatar
                        }
                    />
                    {isProfile && (
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
                                <label
                                    style={{ cursor: "pointer" }}
                                    htmlFor="img"
                                >
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
                    )}
                </Box>
            </Flex>
        );
    };

    return (
        <Flex>
            <SubSideBar
                header="Profile"
                obj={subSideBarObj}
                loc={`profile/${params.userId}`}
            />
            <ContentWrapper contentStyle={{ padding: "30px 50px 60px 300px" }}>
                <Switch>
                    <ProtectedRoute path="/profile/:userId/ideas">
                        <Ideas
                            RightComponent={RightComponent}
                            isProfile={isProfile}
                            otherUser={otherUser}
                        />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/:userId/trades">
                        <Trades
                            RightComponent={RightComponent}
                            isProfile={isProfile}
                            otherUser={otherUser}
                        />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/:userId/stats">
                        <Stats
                            RightComponent={RightComponent}
                            isProfile={isProfile}
                            otherUser={otherUser}
                        />
                    </ProtectedRoute>
                    {isProfile && (
                        <ProtectedRoute path="/profile/:userId/connections">
                            <Connections RightComponent={RightComponent} />
                        </ProtectedRoute>
                    )}
                </Switch>
            </ContentWrapper>
        </Flex>
    );
};

export default Profile;
