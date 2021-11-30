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
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset={off}
                            stopColor="#0DC24A"
                            stopOpacity={5}
                        />
                        <stop
                            offset={off}
                            stopColor="#CD1010"
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
