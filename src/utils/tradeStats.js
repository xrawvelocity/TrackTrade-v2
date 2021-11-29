export const calculateWinLoss = (trades) => {
    let wins = 0;
    trades.map((each) => {
        if (each.win) {
            wins++;
        }
    });
    if (wins) {
        return (wins / trades.length) * 100;
    } else return wins;
};

export const calculatePerformance = (trades) => {
    return null;
};
