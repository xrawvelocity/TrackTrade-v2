export const calculateForexTrade = (trade) => {
    let pips;
    let money;
    let win;

    const isJPY = trade.currency.includes("JPY");

    //sell not jpy
    if (trade.type === "sell" && !isJPY) {
        pips = (trade.entry * 10000 - trade.close * 10000).toFixed(2);
    }
    //sell jpy
    else if (trade.type === "sell" && isJPY) {
        pips = (trade.entry * 100 - trade.close * 100).toFixed(2);
    }
    //buy not jpy
    else if (trade.type === "buy" && !isJPY) {
        pips = (trade.close * 10000 - trade.entry * 10000).toFixed(2);
    }
    //buy jpy
    else if (trade.type === "buy" && isJPY) {
        pips = (trade.close * 100 - trade.entry * 100).toFixed(2);
    }

    money = pips * (trade.lot * 10);

    if (pips > 0) {
        win = true;
    } else {
        win = false;
    }

    return { pips, money, win };
};

export const calculateForexIdea = (trade) => {
    let profit;
    let loss;
    let riskReward;

    const isJPY = trade.currency.includes("JPY");

    //sell not jpy
    if (trade.type === "sell" && !isJPY) {
        profit = trade.entry * 10000 - trade.takeProfit1 * 10000;
        loss = trade.stopLoss * 10000 - trade.entry * 10000;
    }
    //sell jpy
    else if (trade.type === "sell" && isJPY) {
        profit = trade.entry * 100 - trade.takeProfit1 * 100;
        loss = trade.stopLoss * 100 - trade.entry * 100;
    }
    //buy not jpy
    else if (trade.type === "buy" && !isJPY) {
        profit = trade.takeProfit1 * 10000 - trade.entry * 10000;
        loss = trade.entry * 10000 - trade.stopLoss * 10000;
    }
    //buy jpy
    else if (trade.type === "buy" && isJPY) {
        profit = trade.takeProfit1 * 100 - trade.entry * 100;
        loss = trade.entry * 100 - trade.stopLoss * 100;
    }

    riskReward = profit / loss;

    return { riskReward };
};
