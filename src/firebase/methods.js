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
} from "@firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
    listAll,
} from "@firebase/storage";
import { db, storage } from "./firebase";

export const getTraderById = async (id) => {
    const docSnap = await getDoc(doc(collection(db, "users"), id));

    if (docSnap.exists()) {
        let user = docSnap.data();
        return user;
    } else return { username: "Unknown" };
};

export const updateAvatar = async (id, imageUrl = "", previous) => {
    console.log(previous);
    try {
        if (previous) {
            let storageRef = ref(storage, `files/${id}/avatar`);
            let previousAvatar;
            await listAll(storageRef).then(
                (res) => (previousAvatar = res.items[0]._location.path_)
            );
            console.log(previousAvatar);
            await deleteObject(ref(storage, previousAvatar))
                .then(() => console.log("deleted"))
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
                setProgress(100);
            });
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
