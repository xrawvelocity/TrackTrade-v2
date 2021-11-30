import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    arrayUnion,
    arrayRemove,
    increment,
    setDoc,
} from "@firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
    listAll,
} from "@firebase/storage";
import { calculateWinLoss } from "utils/tradeStats";
import { db, storage } from "./firebase";

export const getTraderById = async (id) => {
    const docSnap = await getDoc(doc(collection(db, "users"), id));

    if (docSnap.exists()) {
        let user = docSnap.data();
        return user;
    } else return { username: "" };
};

export const updateAvatar = async (id, imageUrl = "", previous) => {
    try {
        if (previous) {
            let storageRef = ref(storage, `files/${id}/avatar`);
            let previousAvatar;
            await listAll(storageRef).then(
                (res) => (previousAvatar = res.items[0]._location.path_)
            );
            await deleteObject(ref(storage, previousAvatar))
                .then(() => console.log("deleted previous avatar"))
                .catch((err) => console.log(err));
        }
        await updateDoc(doc(db, "users", id), { avatar: imageUrl });
    } catch (err) {
        console.log(err);
    }
};

export const getAllTraders = async () => {
    const querySnap = await getDocs(collection(db, "users"));
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const getUserIdeas = async (id) => {
    const querySnap = await getDocs(
        query(collection(db, "ideas"), where("trader", "==", id))
    );
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const getAllIdeas = async () => {
    const querySnap = await getDocs(collection(db, "ideas"));
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const getUserTrades = async (id) => {
    const querySnap = await getDocs(
        query(collection(db, "trades"), where("trader", "==", id))
    );
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const getAllTrades = async () => {
    const querySnap = await getDocs(collection(db, "trades"));
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const uploadImage = (file, path, setProgress, setImageUrl) => {
    if (!file) return;
    const storageRef = ref(
        storage,
        `${path}_${(Math.random() * 90000 + 1000).toFixed(0)}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog - 1);
        },
        (err) => console.log(err),
        async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setImageUrl(url);
            });
            setProgress(100);
        }
    );
};

export const addConnection = async (id, otherId) => {
    try {
        await updateDoc(doc(db, "users", id), {
            connections: arrayUnion(otherId),
        });
    } catch (err) {
        console.log(err);
    }
};

export const removeConnection = async (id, otherId) => {
    try {
        await updateDoc(doc(db, "users", id), {
            connections: arrayRemove(otherId),
        });
    } catch (err) {
        console.log(err);
    }
};

export const getAllConnections = async (connections) => {
    let all = [];
    if (connections.length) {
        const q = await query(
            collection(db, "users"),
            where("uid", "in", connections)
        );
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
            all.push(doc.data());
        });
    }
    return all;
};

export const postTrade = async (
    values,
    setSuccess,
    handleClose,
    setError,
    setProgress
) => {
    try {
        await setDoc(doc(collection(db, "trades")), values);
        let trades = await getUserTrades(values.trader);
        await updateDoc(doc(db, "users", values.trader), {
            totalTrades: trades.length,
            winLoss: calculateWinLoss(trades),
        });

        setSuccess(true);
        setTimeout(() => {
            handleClose();
        }, 2000);
    } catch (err) {
        setError("There was an error, please try again");
        setProgress(null);
        setTimeout(() => {
            setError("");
        }, 2000);
    }
};
