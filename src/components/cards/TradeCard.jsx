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

import CustomModal from "../modals/CustomModal";

const TradeCard = ({ trade, ...props }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState({});

    useAsyncEffect(async () => {
        let res = await getTraderById(trade.trader);
        await setUser(res);
    }, []);

    return (
        <>
            <Paper className="trade-ideas-card">
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-more"
                >
                    click for more info
                </div>
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-link"
                >
                    {/* {trade.money > 0 ? (
                        <div className="trade-ideas-card-win-all">WIN</div>
                    ) : (
                        <div className="trade-ideas-card-loss-all">LOSS</div>
                    )} */}

                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            {trade.currency}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Entry:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {trade.entry}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Close:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {trade.close}
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
                            {formatTime(trade.createdAt)}
                        </div>
                    </div>
                </div>
            </Paper>
            <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div class="popup">
                    <div class="popup__content" id="content">
                        {trade.imageUrl ? (
                            <img
                                className="popup__left"
                                src={trade.imageUrl}
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
                                {trade.currency}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                Entry: {trade.entry}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Stoploss: {}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Takeprofit: {}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {trade.description ? (
                                    <p class="popup__text">
                                        {trade.description}
                                    </p>
                                ) : (
                                    <p class="popup__text">
                                        No description provided
                                    </p>
                                )}
                            </h2>
                            <p class="popup__text">
                                Created by:
                                <Link to={`/profile/${trade.trader}`}>
                                    {user.username}
                                </Link>
                            </p>

                            <div className="popup_right-sharing-icons">
                                <FacebookShareButton
                                    url={`https://www.tracktrade.co/profile/${user.username}`}
                                    title={`${user.username}'s TRADE IDEA:\n${
                                        trade.currency
                                    } \nEntry: ${
                                        trade.entry
                                    }\nStoploss: \nTakeprofit: \n${
                                        trade.description
                                            ? `Description: ${trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://www.tracktrade.co/profile/${user.username}`}
                                    title={`${user.username}'s TRADE IDEA:\n${
                                        trade.currency
                                    } \nEntry: ${
                                        trade.entry
                                    }\nStoploss: \nTakeprofit: \n${
                                        trade.description
                                            ? `Description: ${trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <TelegramShareButton
                                    url={`https://www.tracktrade.co/profile/${user.username}`}
                                    title={`${user.username}'s TRADE IDEA:\n${
                                        trade.currency
                                    } \nEntry: ${
                                        trade.entry
                                    }\nStoploss: \nTakeprofit: \n${
                                        trade.description
                                            ? `Description: ${trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                                <WhatsappShareButton
                                    url={`https://www.tracktrade.co/profile/${user.username}`}
                                    title={`${user.username}'s TRADE IDEA:\n${
                                        trade.currency
                                    } \nEntry: ${
                                        trade.entry
                                    }\nStoploss: \nTakeprofit: \n${
                                        trade.description
                                            ? `Description: ${trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default TradeCard;
