import { makeStyles } from "@mui/styles";
import React from "react";
import Flex from "./Flex";
import MainButton from "../buttons/MainButton";
import Search from "../inputs/Search";
import SelectInput from "../inputs/SelectInput";

const Toolbar = ({
    onSearch,
    searchPlaceholder,
    onSort,
    sortOptions = [],
    onButton,
    buttonText,
}) => {
    const useStyles = makeStyles(() => ({
        container: {
            backgroundColor: "#111c44",
            padding: "1rem 3rem",
            margin: "0 0 3rem -3rem",
            width: "103%",
            justifyContent: "space-between",
            alignItems: "center",
        },
    }));
    const classes = useStyles();
    return (
        <Flex className={classes.container}>
            <Flex>
                <Search
                    style={{ marginRight: "3rem" }}
                    handleSearch={onSearch}
                    placeholder={searchPlaceholder}
                />
                <SelectInput
                    options={sortOptions}
                    handleChange={onSort}
                    width=""
                />
            </Flex>
            {buttonText && (
                <MainButton onClick={onButton}>{buttonText}</MainButton>
            )}
        </Flex>
    );
};

export default Toolbar;
