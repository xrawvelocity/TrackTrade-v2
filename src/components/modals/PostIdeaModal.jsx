import {
    Backdrop,
    Button,
    Fade,
    Grid,
    IconButton,
    InputLabel,
    FormControl,
    Modal,
    Select,
    Typography,
    Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import CustomModal from "./CustomModal";
import FormInput from "components/inputs/FormInput";
import Flex from "components/Flex";
import { SYMBOLS } from "enums/symbols";
import SelectInput from "components/inputs/SelectInput";
import MainButton from "components/MainButton";
import { collection, doc, setDoc } from "@firebase/firestore";

export default function PostIdeaModal({ open, onClose }) {
    const [initialValues] = useState({});

    const onSubmit = async (form) => {
        console.log(form);
        await setDoc(doc(collection(db, "ideas")), {
            test: "3",
        });
    };

    return (
        <CustomModal open={open} onClose={onClose}>
            <header>
                <Flex
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem 2rem",
                    }}
                >
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{ fontSize: "2rem" }}
                    >
                        Post Trade Idea
                    </Typography>
                    <IconButton
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "2rem" }} />
                    </IconButton>
                </Flex>
                <Divider />
            </header>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ form, values }) => {
                    return (
                        <>
                            <Grid
                                container
                                spacing={3}
                                style={{ padding: "2rem", width: "500px" }}
                            >
                                <Grid item xs={6}>
                                    <Field
                                        name="currency"
                                        render={({ input, meta }) => (
                                            <SelectInput
                                                error={
                                                    meta.touched && meta.error
                                                }
                                                options={SYMBOLS}
                                                label="Currency"
                                                {...input}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="entry"
                                        label="Entry"
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="takeProfit"
                                        label="Take Profit"
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="stopLoss"
                                        label="Stop Loss"
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="description"
                                        label="Description"
                                        required
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Flex
                                        sx={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                        }}
                                    >
                                        <input
                                            onChange={(e) => null}
                                            type="file"
                                            style={{
                                                visibility: "hidden",
                                                display: "none",
                                            }}
                                            name="screenshot"
                                            id="screenshot"
                                            accept="image/*"
                                            required
                                        />
                                        <label
                                            tabindex="0"
                                            htmlFor="screenshot"
                                            style={{
                                                margin: "0",
                                                border: "1px solid rgba(0,0,0,0.3)",
                                                borderRadius: "4px",
                                                padding: "1rem 1.5rem",
                                                cursor: "pointer",
                                                fontSize: "1.4rem",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "#77777750",
                                                },
                                            }}
                                        >
                                            Select a file...
                                        </label>
                                        {/* {state.imageUrl ? (
                                            <p>
                                                {state.imageUrl.slice(
                                                    state.imageUrl.lastIndexOf("/") + 1,
                                                    -4
                                                )}
                                            </p>
                                        ) : null} */}
                                    </Flex>
                                </Grid>

                                <Divider />
                            </Grid>

                            <Flex
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    margin: "3rem 0 2rem",
                                }}
                            >
                                <MainButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => form.submit()}
                                >
                                    Post Trade Idea
                                </MainButton>
                            </Flex>
                        </>
                    );
                }}
            />
        </CustomModal>
    );
}
