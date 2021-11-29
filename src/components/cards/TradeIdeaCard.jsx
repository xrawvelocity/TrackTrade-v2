import { Divider, Paper, Typography } from "@mui/material";
import { getTraderById } from "firebase/methods";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import { formatTime } from "utils/formatTime";
import { tradeKind } from "utils/tradeKind";

import Flex from "../partials/Flex";
import CustomModal from "../modals/CustomModal";
import { COLORS } from "enums/colors";
import moment from "moment";
import UserAvatar from "components/partials/UserAvatar";

const TradeIdeaCard = ({ tradeIdea, ...props }) => {
    console.log(tradeIdea);
    const {
        type,
        currency,
        risk,
        stopLoss,
        entry,
        takeProfit1,
        takeProfit2,
        description,
        imageUrl,
        trader,
        createdAt,
        riskReward,
    } = tradeIdea;
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [isProfile, setIsProfile] = useState(false);
    const [user, setUser] = useState({});

    useAsyncEffect(async () => {
        let res = await getTraderById(tradeIdea.trader);
        await setUser(res);
    }, [tradeIdea]);

    // setIsProfile(props.checkLogin?.data?.username === tradeIdea.trader);
    const deleteCard = async (id) => {
        try {
            // delete goes here
        } catch (err) {
            console.log("--=-=-=-=-=-=-=", err);
        }
    };
    return (
        <>
            <Paper elevation={4}>
                <Flex sx={{ flexDirection: "column" }}>
                    <div>
                        <Flex
                            sx={{
                                p: "2rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Flex sx={{ alignItems: "center" }}>
                                <Typography
                                    sx={{
                                        fontSize: "2.2rem",
                                        fontWeight: "700",

                                        color:
                                            type === "sell"
                                                ? "#c21"
                                                : COLORS.green,
                                    }}
                                >
                                    {type.toUpperCase()}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2rem",
                                        fontWeight: "500",
                                        ml: "2rem",
                                    }}
                                >
                                    {currency}
                                </Typography>
                            </Flex>
                            <Flex sx={{ alignItems: "center" }}>
                                <Typography
                                    sx={{
                                        fontSize: "2rem",
                                        fontWeight: "500",
                                        mr: "2rem",
                                    }}
                                >
                                    {user.username}
                                </Typography>
                                <UserAvatar
                                    imageUrl={user.avatar}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        zIndex: "20",
                                    }}
                                />
                            </Flex>
                        </Flex>
                        <Divider />
                    </div>
                    {imageUrl && (
                        <Flex sx={{ height: "250px", width: "100%" }}>
                            <img
                                src={imageUrl}
                                alt="Trade Idea Image"
                                style={{ objectFit: "cover", width: "100%" }}
                            />
                            <Divider />
                        </Flex>
                    )}
                    <Flex>
                        <Flex sx={{ flexDirection: "column" }}>
                            <Flex
                                sx={{
                                    alignItems: "center",
                                    p: "2rem",
                                    pb: "1rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Entry:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {entry}
                                </Typography>
                            </Flex>
                            <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Stop Loss:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {stopLoss}
                                </Typography>
                            </Flex>
                            <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Take Profit 1:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {takeProfit1}
                                </Typography>
                            </Flex>
                            {takeProfit2 && (
                                <Flex
                                    sx={{
                                        alignItems: "center",
                                        p: "1rem 2rem",
                                        pb: "2rem",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.6rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Take Profit 2:
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                    >
                                        {takeProfit2}
                                    </Typography>
                                </Flex>
                            )}

                            {/* <Divider /> */}
                        </Flex>
                        <Flex sx={{ flexDirection: "column" }}>
                            <Flex
                                sx={{
                                    alignItems: "center",
                                    p: "1rem 2rem",
                                    pt: "2rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Published:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {moment(createdAt).format(
                                        "dddd, MMM Do YYYY"
                                    )}
                                </Typography>
                            </Flex>
                            <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Risk Level:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {risk}
                                </Typography>
                            </Flex>
                            <Flex sx={{ alignItems: "center", p: "1rem 2rem" }}>
                                <Typography
                                    sx={{
                                        fontSize: "1.6rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Risk to Reward:
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.6rem", ml: "1rem" }}
                                >
                                    {Number(riskReward)?.toFixed(2)}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* here would go the liking, commenting, and sharing buttons */}
                </Flex>
            </Paper>
            <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div class="popup">
                    <div class="popup__content" id="content">
                        {tradeIdea.imageUrl ? (
                            <img
                                className="popup__left"
                                src={tradeIdea.imageUrl}
                                alt="Trade image"
                            />
                        ) : null}
                        <div class="popup__right">
                            <div
                                onClick={() => setModalOpen(false)}
                                class="popup__close"
                            >
                                &times;
                            </div>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {tradeIdea.currency} {tradeIdea.kind}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                Entry: {tradeIdea.entry}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Stoploss: {tradeIdea.stopLoss}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Takeprofit: {tradeIdea.takeProfit}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {tradeIdea.description ? (
                                    <p class="popup__text">
                                        {tradeIdea.description}
                                    </p>
                                ) : (
                                    <p class="popup__text">
                                        No description provided
                                    </p>
                                )}
                            </h2>
                            <p class="popup__text">
                                Created by:
                                <Link to={`/profile/${tradeIdea.trader}`}>
                                    {tradeIdea.trader}
                                </Link>
                            </p>

                            <div className="popup_right-sharing-icons">
                                <FacebookShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trader}`}
                                    title={`${
                                        tradeIdea.trader
                                    }'s TRADE IDEA:\n${tradeIdea.currency} ${
                                        tradeIdea.kind
                                    }\nEntry: ${tradeIdea.entry}\nStoploss: ${
                                        tradeIdea.stopLoss
                                    }\nTakeprofit: ${tradeIdea.takeProfit}\n${
                                        tradeIdea.description
                                            ? `Description: ${tradeIdea.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trader}`}
                                    title={`${
                                        tradeIdea.trader
                                    }'s TRADE IDEA:\n${tradeIdea.currency} ${
                                        tradeIdea.kind
                                    }\nEntry: ${tradeIdea.entry}\nStoploss: ${
                                        tradeIdea.stopLoss
                                    }\nTakeprofit: ${tradeIdea.takeProfit}\n${
                                        tradeIdea.description
                                            ? `Description: ${tradeIdea.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <TelegramShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trader}`}
                                    title={`${
                                        tradeIdea.trader
                                    }'s TRADE IDEA:\n${tradeIdea.currency} ${
                                        tradeIdea.kind
                                    }\nEntry: ${tradeIdea.entry}\nStoploss: ${
                                        tradeIdea.stopLoss
                                    }\nTakeprofit: ${tradeIdea.takeProfit}\n${
                                        tradeIdea.description
                                            ? `Description: ${tradeIdea.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                                <WhatsappShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trader}`}
                                    title={`${
                                        tradeIdea.trader
                                    }'s TRADE IDEA:\n${tradeIdea.currency} ${
                                        tradeIdea.kind
                                    }\nEntry: ${tradeIdea.entry}\nStoploss: ${
                                        tradeIdea.stopLoss
                                    }\nTakeprofit: ${tradeIdea.takeProfit}\n${
                                        tradeIdea.description
                                            ? `Description: ${tradeIdea.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                            {isProfile ? (
                                <Flex sx={{ marginTop: "1rem" }}>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="popup__edit"
                                    >
                                        EDIT IDEA
                                    </button>
                                    <button
                                        href="#main"
                                        onClick={() =>
                                            deleteCard(
                                                props.selectedTradeIdea
                                                    .eachTrade._id
                                            )
                                        }
                                        className="popup__delete"
                                    >
                                        DELETE IDEA
                                    </button>
                                </Flex>
                            ) : null}
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default TradeIdeaCard;
