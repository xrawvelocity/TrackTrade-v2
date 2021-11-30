import { collection, doc, setDoc } from "@firebase/firestore";
import { Close as CloseIcon } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
    Alert,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import Flex from "components/partials/Flex";
import FormInput from "components/inputs/FormInput";
import SelectInput from "components/inputs/SelectInput";
import MainButton from "components/buttons/MainButton";
import { SYMBOLS } from "enums/symbols";
import { uploadImage } from "firebase/methods";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { useAuth } from "../../context/authCtx";
import { db } from "../../firebase/firebase";
import { useAsyncEffect } from "../../hooks/use-async-effect";
import CustomModal from "./CustomModal";
import { calculateForexIdea } from "utils/calculateForex";

export default function PostIdeaModal({ open, onClose }) {
    const { getUserData, userData, currentUser } = useAuth();
    const [initialValues] = useState({});
    const [ideaImage, setIdeaImage] = useState({});
    const [progress, setProgress] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [calculatedValues, setCalculatedValues] = useState({});
    const [values, setValues] = useState({});
    const [imageUrl, setImageUrl] = useState("");

    useAsyncEffect(async () => {
        await getUserData();
    }, []);

    useAsyncEffect(async () => {
        if (imageUrl) {
            await setDoc(doc(collection(db, "ideas")), {
                trader: currentUser.uid,
                ...values,
                ...calculatedValues,
                createdAt: Date.now(),
                imageUrl,
            })
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => {
                        handleClose();
                    }, 2000);
                })
                .catch((err) => {
                    setError("There was an error, please try again");
                    setTimeout(() => {
                        setError("");
                    }, 2000);
                });
        }
    }, [imageUrl]);

    const handleClose = () => {
        onClose();
        setSuccess(false);
        setError("");
        setProgress(null);
        setIdeaImage({});
    };

    const onSubmit = async (vals, form) => {
        if (
            !vals.currency ||
            !vals.entry ||
            !vals.stopLoss ||
            !vals.takeProfit1 ||
            !vals.type
        ) {
            setError("Please fill out all the required fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        await setCalculatedValues(calculateForexIdea(vals));
        await setValues(vals);
        if (ideaImage.name) {
            await uploadImage(
                ideaImage,
                `/files/${currentUser.uid}/ideas/${ideaImage.name}`,
                setProgress,
                setImageUrl
            );
        }
        if (!ideaImage.name) {
            await setDoc(doc(collection(db, "ideas")), {
                trader: currentUser.uid,
                ...vals,
                ...calculatedValues,
                createdAt: Date.now(),
                imageUrl,
            })
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => {
                        handleClose();
                    }, 2000);
                })
                .catch((err) => {
                    setError("There was an error, please try again");
                    setTimeout(() => {
                        setError("");
                    }, 2000);
                });
        }
    };

    return (
        <CustomModal open={open} onClose={handleClose}>
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
                            handleClose();
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
                render={({ form, values, handleSubmit }) => {
                    return (
                        <form onSubmit={(vals) => handleSubmit(vals, form)}>
                            <Grid
                                container
                                spacing={3}
                                style={{ padding: "2rem", width: "550px" }}
                            >
                                <Grid item xs={6}>
                                    <Field
                                        required
                                        name="currency"
                                        render={({ input, meta }) => (
                                            <SelectInput
                                                error={
                                                    meta.touched && meta.error
                                                }
                                                options={SYMBOLS}
                                                label="Currency *"
                                                {...input}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        required
                                        name="type"
                                        render={({ input, meta }) => (
                                            <SelectInput
                                                error={
                                                    meta.touched && meta.error
                                                }
                                                options={[
                                                    {
                                                        value: "sell",
                                                        text: "Sell",
                                                    },
                                                    {
                                                        value: "buy",
                                                        text: "Buy",
                                                    },
                                                ]}
                                                label="Type *"
                                                {...input}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        required
                                        name="risk"
                                        render={({ input, meta }) => (
                                            <SelectInput
                                                error={
                                                    meta.touched && meta.error
                                                }
                                                options={[
                                                    {
                                                        value: "low",
                                                        text: "Low",
                                                    },
                                                    {
                                                        value: "normal",
                                                        text: "Normal",
                                                    },
                                                    {
                                                        value: "big",
                                                        text: "Big",
                                                    },
                                                ]}
                                                label="Risk"
                                                {...input}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="entry"
                                        label="Entry *"
                                        type="number"
                                        required
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormInput
                                        name="stopLoss"
                                        label="Stop Loss *"
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="takeProfit1"
                                        label="Take Profit 1 *"
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        name="takeProfit2"
                                        label="Take Profit 2"
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
                                            flexDirection: "column",
                                            height: "100%",
                                            "&:hover": {
                                                "& > label": {
                                                    border: "1px solid rgba(0,0,0,0.6) !important",
                                                },
                                            },
                                        }}
                                    >
                                        <input
                                            onChange={(e) =>
                                                setIdeaImage(e.target.files[0])
                                            }
                                            type="file"
                                            style={{
                                                visibility: "hidden",
                                                display: "none",
                                            }}
                                            name="screenshot"
                                            id="screenshot"
                                            accept="image/*"
                                        />
                                        <label
                                            tabIndex="0"
                                            htmlFor="screenshot"
                                            style={{
                                                margin: "0",
                                                border: "1px solid rgba(0,0,0,0.3)",
                                                borderRadius: "4px",
                                                padding: "1rem 1.5rem",
                                                cursor: "pointer",
                                                fontSize: "1.4rem",
                                                transition: "all .1s ease",
                                            }}
                                        >
                                            Select a file...
                                        </label>
                                        {ideaImage.name ? (
                                            <Flex
                                                sx={{
                                                    alignItems: "center",
                                                    mt: "2rem",
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: "1.6rem" }}
                                                >
                                                    {ideaImage.name}
                                                </Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        setIdeaImage({})
                                                    }
                                                    sx={{
                                                        color: "#a91832",
                                                        ml: "1rem",
                                                        mb: "2px",
                                                    }}
                                                >
                                                    <DeleteForeverIcon
                                                        sx={{
                                                            fontSize: "2.5rem",
                                                        }}
                                                    />
                                                </IconButton>
                                            </Flex>
                                        ) : null}
                                    </Flex>
                                </Grid>

                                <Divider />
                            </Grid>

                            <Flex
                                style={{
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    margin: "2rem 0",
                                }}
                            >
                                <MainButton
                                    variant="contained"
                                    color="primary"
                                    loading={
                                        (progress && progress !== 100) ||
                                        success
                                    }
                                    onClick={() => form.submit()}
                                >
                                    Post Trade Idea
                                </MainButton>
                                {success && (
                                    <Alert
                                        sx={{ mt: "2rem", fontSize: "1.4rem" }}
                                        severity="success"
                                    >
                                        Trade Idea Published
                                    </Alert>
                                )}
                                {error && (
                                    <Alert
                                        sx={{ mt: "2rem", fontSize: "1.4rem" }}
                                        severity="error"
                                    >
                                        {error}
                                    </Alert>
                                )}
                            </Flex>
                        </form>
                    );
                }}
            />
        </CustomModal>
    );
}
