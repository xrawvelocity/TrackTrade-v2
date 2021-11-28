import {
    Chat as ChatIcon,
    Home as HomeIcon,
    Info as InfoIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Search as SearchIcon,
} from "@mui/icons-material";
import { Icon, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authCtx";
import Flex from "./Flex";
import Logo from "./Logo";

const Sidebar = (props) => {
    const history = useHistory();
    const location = useLocation();
    const { currentUser, logOut } = useAuth();

    const isDashboard =
        location.pathname === "/" || location.pathname === "/dashboard";

    const onLogOut = async () => {
        await logOut();
        history.push("/");
    };

    const topSidebarObj = [
        { text: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
        {
            text: "Profile",
            path: `/profile/${currentUser?.uid}/ideas`,
            icon: <PersonIcon />,
        },
        { text: "Messages", path: "/messages", icon: <ChatIcon /> },
        { text: "Browse", path: "/browse/all-ideas", icon: <SearchIcon /> },
    ];

    const bottomSidebarObj = [
        { text: "Info", path: "/info", icon: <InfoIcon /> },
        { text: "Logout", path: logOut, icon: <LogoutIcon /> },
    ];

    if (currentUser?.email) {
        return (
            <nav
                style={{
                    backgroundColor: "#06151b",
                    borderRight: "2px solid #00000050",
                    height: "100%",
                    position: "fixed",
                    left: "0",
                    zIndex: "300",
                    padding: "20px",
                    transition: "all 0.1s ease-in",
                    width: `${isDashboard ? "180px" : "80px"}`,
                }}
            >
                <Flex
                    sx={{
                        flexDirection: "column",
                        alignItems: `${isDashboard ? "flex-start" : "center"}`,
                    }}
                >
                    {isDashboard ? (
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                height: "56px",
                                marginBottom: "2rem",
                            }}
                        >
                            <div
                                style={{
                                    cursor: "default",
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontSize: "2.4rem",
                                    textAlign: "left",
                                    textTransform: "uppercase",
                                    lineHeight: "1.2",
                                }}
                            >
                                Track
                                <br />
                                Trade
                            </div>
                        </Flex>
                    ) : (
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                height: "56px",
                                marginBottom: "2rem",
                            }}
                        >
                            <Logo />
                        </Flex>
                    )}
                    <Flex
                        sx={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "calc(100vh - 116px)",
                        }}
                    >
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: `${
                                    isDashboard ? "flex-start" : "center"
                                }`,
                            }}
                        >
                            {topSidebarObj.map((each) => {
                                if (!isDashboard) {
                                    return (
                                        <Tooltip
                                            title={each.text}
                                            placement="right"
                                            arrow
                                        >
                                            <Link
                                                className={`${
                                                    location.pathname.includes(
                                                        each.path.split("/")[1]
                                                    ) ||
                                                    (location.pathname ===
                                                        "/" &&
                                                        each.path ===
                                                            "/dashboard")
                                                        ? "sidebar-link_selected"
                                                        : "sidebar-link"
                                                }`}
                                                to={each.path}
                                            >
                                                <Flex
                                                    sx={{
                                                        alignItems: "center",
                                                        height: "40px",
                                                        margin: ".5rem 0",
                                                    }}
                                                >
                                                    <Icon
                                                        sx={{
                                                            fontSize:
                                                                "2.4rem !important",
                                                            "& > *": {
                                                                fontSize:
                                                                    "2.4rem !important",
                                                            },
                                                        }}
                                                    >
                                                        {each.icon}
                                                    </Icon>
                                                </Flex>
                                            </Link>
                                        </Tooltip>
                                    );
                                } else {
                                    return (
                                        <Link
                                            className={`${
                                                location.pathname.includes(
                                                    each.path
                                                ) ||
                                                (location.pathname === "/" &&
                                                    each.path === "/dashboard")
                                                    ? "sidebar-link_selected"
                                                    : "sidebar-link"
                                            }`}
                                            to={each.path}
                                        >
                                            <Flex
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    alignItems: "center",
                                                    height: "40px",
                                                    margin: ".5rem 0",
                                                }}
                                            >
                                                <Icon
                                                    sx={{
                                                        fontSize:
                                                            "2.4rem !important",
                                                        "& > *": {
                                                            fontSize:
                                                                "2.4rem !important",
                                                        },
                                                    }}
                                                >
                                                    {each.icon}
                                                </Icon>
                                                <Typography
                                                    style={{
                                                        paddingLeft: "1rem",
                                                        fontSize: "2rem",
                                                    }}
                                                >
                                                    {each.text}
                                                </Typography>
                                            </Flex>
                                        </Link>
                                    );
                                }
                            })}
                        </Flex>
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: `${
                                    isDashboard ? "flex-start" : "center"
                                }`,
                            }}
                        >
                            {/* Info */}
                            {!isDashboard ? (
                                <Tooltip title={"Info"} placement="right" arrow>
                                    <Link
                                        className={`${
                                            location.pathname.includes("/info")
                                                ? "sidebar-link_selected"
                                                : "sidebar-link"
                                        }`}
                                        to="/info"
                                        style={{
                                            height: "40px",
                                            margin: ".5rem 0",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",

                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <InfoIcon />
                                        </Icon>
                                    </Link>
                                </Tooltip>
                            ) : (
                                <Link
                                    className={`${
                                        location.pathname.includes("/info")
                                            ? "sidebar-link_selected"
                                            : "sidebar-link"
                                    }`}
                                    to={"/info"}
                                >
                                    <Flex
                                        sx={{
                                            alignSelf: "flex-start",
                                            alignItems: "center",
                                            height: "40px",
                                            margin: ".5rem 0",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",
                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <InfoIcon />
                                        </Icon>
                                        <Typography
                                            style={{
                                                paddingLeft: "1rem",
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Info
                                        </Typography>
                                    </Flex>
                                </Link>
                            )}
                            {/* Logout */}
                            {!isDashboard ? (
                                <Tooltip
                                    title="Log Out"
                                    placement="right"
                                    arrow
                                >
                                    <Icon
                                        className="sidebar-link"
                                        sx={{
                                            height: "40px",
                                            margin: ".5rem 0",
                                            fontSize: "2.4rem !important",
                                            display: "flex",
                                            alignItems: "center",

                                            "&:hover": {
                                                cursor: "pointer",
                                            },

                                            "& > *": {
                                                fontSize: "2.4rem !important",
                                            },
                                        }}
                                        onClick={onLogOut}
                                    >
                                        <LogoutIcon />
                                    </Icon>
                                </Tooltip>
                            ) : (
                                <div
                                    className="sidebar-link"
                                    onClick={onLogOut}
                                >
                                    <Flex
                                        sx={{
                                            alignSelf: "flex-start",
                                            alignItems: "center",
                                            height: "40px",
                                            margin: ".5rem 0",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",
                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <LogoutIcon />
                                        </Icon>
                                        <Typography
                                            style={{
                                                paddingLeft: "1rem",
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Log Out
                                        </Typography>
                                    </Flex>
                                </div>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </nav>
        );
    } else {
        return null;
    }
};

export default Sidebar;
