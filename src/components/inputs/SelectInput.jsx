import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const SelectInput = ({
    placeholder,
    handleChange,
    width = "auto",
    style,
    label = "Sort By:",
    options = [],
    ...rest
}) => {
    const styles = makeStyles(() => ({
        select: {
            borderRadius: "0.4rem",
            // backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 2px 3px rgba(0,0,0,0.0.5)",
            marginLeft: 0,
            width: width ? width : 300,
            alignSelf: "center",
            // border: `1px solid ${theme.palette.text.border}`,
            ...style,
        },
        field: {
            height: "auto",
            width: "100%",
            margin: "0 !important",
            padding: "0 !important",
            "& > *": {
                paddingLeft: "0",
                fontSize: "1.6rem",
            },
        },
        item: { fontSize: "1.4rem" },
    }));
    const classes = styles();
    return (
        <div className={classes.select}>
            <FormControl className={classes.field} size="small" {...rest}>
                <InputLabel>{label}</InputLabel>
                <Select {...rest} size="small" label={label}>
                    {options.map((each) => {
                        return (
                            <MenuItem
                                value={each.value}
                                className={classes.item}
                            >
                                {each.text}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectInput;
