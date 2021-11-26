import { Paper } from "@mui/material";
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

import Flex from "../Flex";
import CustomModal from "../modals/CustomModal";

const TradeIdeaCard = ({ tradeIdea, ...props }) => {
    console.log(tradeIdea);
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [isProfile, setIsProfile] = useState(false);
    const [user, setUser] = useState({});

    useAsyncEffect(async () => {
        let res = await getTraderById(tradeIdea.trader);
        await setUser(res);
    }, []);

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
            <Paper elevation={4} className="trade-ideas-card">
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-more"
                >
                    click for more info
                </div>
                <div
                    className="trade-ideas-card-link"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            {tradeIdea.currency} {tradeKind(tradeIdea)}
                        </div>
                    </div>

                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Entry:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.entry}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Stoploss:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.stopLoss}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Takeprofit:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.takeProfit}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">By:</div>
                        <div className="trade-ideas-card__item-content">
                            {user.username}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item-date">
                        <div className="trade-ideas-card__item-date-title">
                            Created at:
                        </div>
                        <div className="trade-ideas-card__item-date-content">
                            {formatTime(tradeIdea.created_at)}
                        </div>
                    </div>
                    {tradeIdea.updatedAt === tradeIdea.created_at ? null : (
                        <div className="trade-ideas-card__item-date">
                            <div className="trade-ideas-card__item-date-title">
                                Updated at:
                            </div>
                            <div className="trade-ideas-card__item-date-content">
                                {formatTime(tradeIdea.updatedAt)}
                            </div>
                        </div>
                    )}
                </div>
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
