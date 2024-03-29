import { Box } from "@mui/material";
import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function CustomTooltip({ payload, label, active }) {
    const value = payload?.[0]?.value || 0;
    const formattedValue = value < 0 ? `-$${Math.abs(value)}` : `$${value}`;

    return active ? (
        <Box sx={{ bgcolor: "#0b1437", p: "1rem", maxWidth: "200px" }}>
            <p>{label}</p>
            <p>{formattedValue}</p>
        </Box>
    ) : null;
}

const CustomLine = () => {
    const data = [
        { x: "12/12/21", y: 124.32 },
        { x: "12/13/21", y: 22.13 },
        { x: "12/14/21", y: -57.45 },
        { x: "12/15/21", y: 231.12 },
        { x: "12/16/21", y: 31.12 },
        { x: "12/12/21", y: 124.32 },
        { x: "12/13/21", y: 22.13 },
        { x: "12/14/21", y: -57.45 },
        { x: "12/15/21", y: 231.12 },
        { x: "12/16/21", y: 31.12 },
    ];

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((each) => each.y));
        const dataMin = Math.min(...data.map((each) => each.y));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 50,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid stroke="#00000015" />
                <XAxis dataKey="x" stroke="#dddddd" />
                <YAxis stroke="#dddddd" />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset={off}
                            stopColor="#01b574"
                            stopOpacity={5}
                        />
                        <stop
                            offset={off}
                            stopColor="#e74c3c"
                            stopOpacity={5}
                        />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="y"
                    stroke="transparent"
                    fill="url(#splitColor)"
                    fillOpacity={1}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CustomLine;
