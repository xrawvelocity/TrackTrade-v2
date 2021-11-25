import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Field } from "react-final-form";

const FormInput = ({
    placeholder,
    handleChange,
    width = "auto",
    style,
    name,
    label,
    ...rest
}) => {
    const styles = makeStyles(() => ({
        root: {
            borderRadius: "0.4rem",
            // backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 2px 3px rgba(0,0,0,0.0.5)",
            marginLeft: 0,
            width: width ? width : 300,
            alignSelf: "center",
            height: "40px",
            // border: `1px solid ${theme.palette.text.border}`,
            ...style,
        },
        field: {
            height: "auto",
            width: "100%",
            margin: "0 !important",
            padding: "0 !important",
            "& > *": {
                fontSize: "1.6rem",
            },
        },
    }));
    const classes = styles();
    return (
        <Field
            className={classes.root}
            name={name}
            render={({ input, meta }) => (
                <FormControl
                    className={classes.field}
                    variant="outlined"
                    size="small"
                >
                    <InputLabel>{label}</InputLabel>
                    <OutlinedInput label={label} {...rest} />
                </FormControl>
            )}
        />
    );
};

export default FormInput;
