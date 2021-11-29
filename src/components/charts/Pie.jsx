import React from "react";
import {
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
} from "recharts";

const CustomPie = ({
    data = [
        { name: "Wins", value: 70, color: "#0cb577" },
        { name: "Losses", value: 30, color: "#a91832" },
    ],
    colors,
    legendProps = {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
    },
}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={45}
                    outerRadius={80}
                    dataKey="value"
                    legendType="circle"
                >
                    <Label position="center" content={""} />
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Legend {...legendProps} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPie;
