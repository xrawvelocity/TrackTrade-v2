import React from "react";
import { formatTime } from "utils/formatTime";

const TraderCard = ({ trader }) => {
    return (
        <Link className="home-card" to={`/profile/${trader.username}`}>
            <div className="trade-ideas-card">
                <div className="trade-ideas-card-more">visit profile</div>

                <div className="trade-ideas-card-link">
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title-home">
                            <div>
                                {trader.avatar ? (
                                    <img
                                        className="trade-ideas-card__item__image"
                                        src={trader.avatar}
                                        alt="avatar"
                                    />
                                ) : (
                                    <div className="trade-ideas-card__item__image-default"></div>
                                )}
                            </div>
                            <div className="trade-ideas-card__item-title-home-text">
                                {trader.username}
                            </div>
                        </div>
                    </div>
                    {/* {trader.created_at && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      User since:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {formatTime(trader.created_at)}
                    </div>
                  </div>
                )} */}
                    {/* {winLossRatio(trader.username) && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Win Loss Ratio:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {winLossRatio(trader.username)}
                    </div>
                  </div>
                )}
                {totalTrades(trader.username) ? (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Total Trades:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {totalTrades(trader.username)}
                    </div>
                  </div>
                ) : (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      This user has no trades posted
                    </div>
                  </div>
                )} */}
                </div>
            </div>
        </Link>
    );
};

export default TraderCard;
