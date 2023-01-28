import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Slide,
    Box,
    Typography,
    Divider,
} from "@mui/material";

export default function SubSideBar({ obj, loc, header }) {
    const history = useHistory();
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);
    const handleOnClick = useCallback(
        (text) => history.push(`/${loc}/${text}`),
        [history, loc]
    );
    useEffect(() => {
        setSelected(location.pathname);
    }, [location]);

    const showItems = () => {
        return obj.map((each, i) => (
            <ListItem
                selected={selected.includes(each.url)}
                sx={{
                    fontSize: "15px",
                    color: "#fff",
                    borderRight: selected.includes(each.url)
                        ? "5px solid #2ba7fa"
                        : "none",
                    "&:hover": {
                        color: "#2ba7fa",
                    },
                }}
                onClick={() => handleOnClick(each.url)}
                button
                key={i}
            >
                <ListItemText primary={each.text} disableTypography />
            </ListItem>
        ));
    };
    return (
        <Slide in={true} out={true} direction="right">
            <Box
                className="sub-sidebar"
                sx={{
                    width: "150px",
                    height: "100%",
                    position: "fixed",
                    borderRadius: "0",
                    color: "#fff",
                    zIndex: "299",
                    marginLeft: "80px",
                }}
            >
                <List padding="0">
                    <Box
                        style={{
                            marginBottom: "2rem",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "3rem",
                                padding: "1.5rem 0 2rem 1.5rem",
                            }}
                            variant="h4"
                        >
                            {header}
                        </Typography>
                        <Divider sx={{ borderColor: "#ffffff50" }} />
                    </Box>
                    {showItems()}
                </List>
            </Box>
        </Slide>
    );
}
