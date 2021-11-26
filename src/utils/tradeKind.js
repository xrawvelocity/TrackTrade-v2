export const tradeKind = (trade) => {
    const { entry, stopLoss, takeProfit } = trade;
    if (
        Number(entry) > Number(stopLoss) ||
        Number(entry) < Number(takeProfit)
    ) {
        return "Buy";
    } else return "Sell";
};
