import { collection, doc, setDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
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
import Flex from "components/Flex";
import FormInput from "components/inputs/FormInput";
import SelectInput from "components/inputs/SelectInput";
import MainButton from "components/MainButton";
import { SYMBOLS } from "enums/symbols";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { useAuth } from "../../context/authCtx";
import { useAsyncEffect } from "../../hooks/use-async-effect";
import { db, storage } from "../../firebase/firebase";
import CustomModal from "./CustomModal";

export default function PostIdeaModal({ open, onClose }) {
    const { getUserData, userData, currentUser } = useAuth();
    const [initialValues] = useState({});
    const [ideaImage, setIdeaImage] = useState({});
    const [progress, setProgress] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useAsyncEffect(async () => {
        await getUserData();
        console.log(userData);
    }, []);

    const handleClose = () => {
        onClose();
        setSuccess(false);
        setError("");
        setProgress(null);
        setIdeaImage({});
    };

    const uploadImage = (file) => {
        if (!file) return;
        const storageRef = ref(
            storage,
            `/files/${currentUser.uid}/ideas/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (err) => console.log(err),
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((url) =>
                    setImageUrl(url)
                );
            }
        );
    };

    const onSubmit = async (vals, form) => {
        console.log(vals, form);
        if (
            !vals.currency ||
            !vals.entry ||
            !vals.stopLoss ||
            !vals.takeProfit
        ) {
            setError("Please fill out all the required fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        if (ideaImage.name) {
            await uploadImage(ideaImage);
        }
        await setDoc(doc(collection(db, "ideas")), {
            trader: currentUser.uid,
            ...vals,
            created_at: Date.now(),
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
                                style={{ padding: "2rem", width: "500px" }}
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
                                                        color: "#c21",
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
                                    disabled={progress && progress !== 100}
                                    onClick={() => form.submit()}
                                >
                                    {progress && progress !== 100 ? (
                                        <CircularProgress value={progress} />
                                    ) : (
                                        "Post Trade Idea"
                                    )}
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
