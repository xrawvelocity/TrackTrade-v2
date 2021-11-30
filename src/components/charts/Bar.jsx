import React from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Rectangle,
} from "recharts";

const CustomBar = () => {
    const data = [
        { name: "EUR/USD", amount: 124.32 },
        { name: "EUR/GBP", amount: 22.13 },
        { name: "USD/CAD", amount: -57.45 },
        { name: "EUR/JPY", amount: 24.32 },
        { name: "GBP/USD", amount: 52.13 },
        { name: "NZD/USD", amount: -124.33 },
        { name: "US30", amount: 231.12 },
        { name: "NAS100", amount: 31.12 },
    ];

    const CustomBarShape = (props) => {
        const { amount } = props;
        let fill;

        if (amount > 0) {
            fill = "#0DC24A";
        } else {
            fill = "#CD1010";
        }

        return <Rectangle {...props} fill={fill} />;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid stroke="#00000015" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="amount" shape={CustomBarShape} barSize={50} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBar;
