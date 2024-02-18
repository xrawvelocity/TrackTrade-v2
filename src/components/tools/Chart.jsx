import { useTheme } from "context/themeCtx";
import React, { Component, useEffect } from "react";

const Chart = () => {
    const { darkMode } = useTheme();
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/tv.js";
    }, []);

    return (
        <div id="tvchart" style={{ height: "100%" }}>
            <iframe
                title="trading view chart"
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 !important",
                    padding: "0 !important",
                    border: "none",
                }}
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1ba07&symbol=CAPITALCOM:US30&interval=H&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=${
                    darkMode ? "dark" : "light"
                }&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget_new&utm_campaign=chart&utm_term=NASDAQ%3AAAPL&backgroundColor=${
                    darkMode ? "rgba(17,28,68,1)" : "rgba(255,255,255,1)"
                }&hide_top_toolbar=true`}
            />
        </div>
    );
};

export default Chart;
